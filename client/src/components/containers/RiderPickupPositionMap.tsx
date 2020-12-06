import React, { useState, useCallback, useEffect } from 'react';

import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { useDispatch, useSelector } from 'react-redux';
import { selectMapReducer } from '../../slices/mapSlice';
import { useApolloClient, useSubscription } from '@apollo/client';
import { useHistory } from 'react-router-dom';

import { subscribeDriverResponse } from '../../apis/driverResponseAPI';

const containerStyle = {
  width: '100%',
  height: '100vh',
};

function RiderPickupPositionMap() {
  const client = useApolloClient();
  const history = useHistory();
  const dispatch = useDispatch();

  const [map, setMap] = useState(null);
  const { originPosition }: any = useSelector(selectMapReducer);

  const onLoad = useCallback((map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  useEffect(() => {
    const subscription = subscribeDriverResponse(client, history, dispatch);
    return () => {
      subscription.unsubscribe();
    };
  }, []);

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
