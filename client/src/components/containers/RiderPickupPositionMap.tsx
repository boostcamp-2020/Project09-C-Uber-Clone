import React, { useState, useCallback, useEffect } from 'react';

import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { useDispatch, useSelector } from 'react-redux';
import { selectMapReducer } from '../../slices/mapSlice';
import { useApolloClient, useSubscription } from '@apollo/client';
import { useHistory } from 'react-router-dom';

import { LISTEN_DRIVER_RESPONSE } from '../../queries/driverResponded';
import { setTrip } from '../../slices/tripSlice';
import { MATCHING_CONFIRM } from '../../constants/matchingResult';

const containerStyle = {
  width: '100%',
  height: '100vh',
};

function RiderPickupPositionMap() {
  const client = useApolloClient();
  const history = useHistory();
  const dispatch = useDispatch();

  const { data } = useSubscription(LISTEN_DRIVER_RESPONSE);
  const { originPosition }: any = useSelector(selectMapReducer);
  const [map, setMap] = useState(null);


  const onLoad = useCallback((map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  useEffect(() => {
    if (data) {
      const { response, driverId, tripId } = data.driverResponded;
      if (response === MATCHING_CONFIRM) {
        dispatch(setTrip({ id: tripId }));
        localStorage.setItem('tripId', tripId);
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
      >
      </GoogleMap>
    </LoadScript>
  );
}

export default RiderPickupPositionMap;
