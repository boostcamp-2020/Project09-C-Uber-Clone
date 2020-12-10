import React, { useState, useCallback, memo } from 'react';

import { GoogleMap, LoadScript, Circle } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100vh',
};

const driverPositionOption = {
  strokeColor: '#FF0000',
  strokeOpacity: 1,
  strokeWeight: 2,
  fillColor: '#FF0000',
  fillOpacity: 1,
  clickable: false,
  draggable: false,
  editable: false,
  visible: true,
  zIndex: 1,
};

function DriverCurrentPositionMap({ driverPos }: any) {
  const [map, setMap] = useState(null);

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
        center={driverPos}
        options={{
          zoomControl: true,
          mapTypeControl: false,
          scaleControl: true,
          streetViewControl: true,
          rotateControl: true,
          fullscreenControl: false,
        }}
      >
        <Circle
          center={driverPos}
          radius={10}
          options={driverPositionOption}
        />
      </GoogleMap>
    </LoadScript>
  );
}

export default memo(DriverCurrentPositionMap);
