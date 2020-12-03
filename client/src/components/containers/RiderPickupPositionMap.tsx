import React, { useState, useCallback } from 'react';

import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { useSelector } from 'react-redux';
import { selectMapReducer } from '../../slices/mapSlice';

const containerStyle = {
  width: '100%',
  height: '100vh',
};

function RiderPickupPositionMap() {
  const [map, setMap] = useState(null);
  const { originPosition }: any = useSelector(selectMapReducer);

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
