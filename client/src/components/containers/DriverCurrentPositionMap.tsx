import React, { useState, useCallback } from 'react';

import { GoogleMap, LoadScript } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '380px',
};

const INIT_POS = {
  lat: 37.55,
  lng: 126.97,
};

function DriverCurrentPositionMap() {
  const [map, setMap] = useState(null);
  const [center, setCenter] = useState(INIT_POS);

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
        zoom={14}
        onLoad={onLoad}
        onUnmount={onUnmount}
        center={center}
      >

      </GoogleMap>
    </LoadScript>
  );
}

export default DriverCurrentPositionMap;
