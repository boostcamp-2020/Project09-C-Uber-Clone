import React, { useState, useCallback, useEffect, useMemo } from 'react';

import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { useDispatch, useSelector } from 'react-redux';
import { selectTripReducer } from '../../slices/tripSlice';
import { useSubscription, useQuery } from '@apollo/client';
import { useHistory } from 'react-router-dom';

import { LISTEN_DRIVER_RESPONSE } from '../../queries/driverResponded';
import { GET_ORIGIN_POSITION_AND_DESTINATION_POSITION } from '../../queries/trip';
import { setTrip } from '../../slices/tripSlice';
import { MATCHED } from '../../constants/tripStatus';

const containerStyle = {
  width: '100%',
  height: '100vh',
};

function RiderPickupPositionMap() {
  const history = useHistory();
  const dispatch = useDispatch();

  const { data } = useSubscription(LISTEN_DRIVER_RESPONSE);
  const { trip }: any = useSelector(selectTripReducer);

  const { data: tripData } = useQuery(GET_ORIGIN_POSITION_AND_DESTINATION_POSITION,
    { variables: { id: trip.id } });
  const originPosition = useMemo(() => tripData ? { lat: tripData.trip.origin.latitude, lng: tripData.trip.origin.longitude } : { lat: 0, lng: 0 }, [tripData]);

  const [map, setMap] = useState(null);


  const onLoad = useCallback((map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  useEffect(() => {
    if (data) {
      const { id, status } = data.driverResponded;
      if (status === MATCHED) {
        dispatch(setTrip({ id }));
        history.push('/rider/pickup');
      }
    }
  }, [data]);

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_API_KEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        zoom={16}
        onLoad={onLoad}
        onUnmount={onUnmount}
        center={originPosition}
        options={{
          zoomControl: true,
          mapTypeControl: false,
          scaleControl: true,
          streetViewControl: true,
          rotateControl: true,
          fullscreenControl: false,
        }}
      >
      </GoogleMap>
    </LoadScript>
  );
}

export default RiderPickupPositionMap;
