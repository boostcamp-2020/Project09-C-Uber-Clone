import React, { useState, useCallback } from 'react';

import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { useSelector } from 'react-redux';
import { selectMapReducer } from '../../slices/mapSlice';
import { useSubscription } from '@apollo/client';

import { driverResponded } from '../../queries/driverResponded';

const containerStyle = {
  width: '100%',
  height: '100vh',
};

//TODO: call Request 결과 생성된 trip id 로 대체
const TRIP_ID = '';

function RiderPickupPositionMap() {
  const [map, setMap] = useState(null);
  const { originPosition }: any = useSelector(selectMapReducer);

  useSubscription(driverResponded, { onSubscriptionData: ({ subscriptionData: { data } }) => {
    console.log(data);
    //TODO: data의 response메시지가 success이면 skip:true로 변경 후 다음 화면
  } });

  const onLoad = useCallback((map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
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
