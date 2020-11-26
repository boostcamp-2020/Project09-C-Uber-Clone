import React, { useState, useCallback, memo } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { useSelector } from 'react-redux';

import { selectPosition } from '../../slices/mapSlice';
// Map 사이즈
const containerStyle = {
  width: '100%',
  height: '380px',
};

function Map() {
  const [map, setMap] = useState(null);
  const position = useSelector(selectPosition);

  const onLoad = useCallback((map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback((map) => {
    setMap(null);
  }, []);

  return (
    <LoadScript
      googleMapsApiKey={process.env.REACT_APP_API_KEY}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        zoom={15}
        onLoad={onLoad}
        onUnmount={onUnmount}
        center={position}
      >
        <Marker
          position={position}
        />
      </GoogleMap>
    </LoadScript>
  );
}

export default memo(Map);
