import React, { useState, useCallback, useEffect } from 'react';

import { GoogleMap, LoadScript, Circle } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '700px',
};

const INIT_POS = {
  lat: 37.55,
  lng: 126.97,
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

function DriverCurrentPositionMap() {
  const [map, setMap] = useState(null);
  const [center, setCenter] = useState(INIT_POS);

  const onLoad = useCallback((map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  const success = (position: Position): any => {
    const pos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };
    if (JSON.stringify(center) !== JSON.stringify(pos)) {
      setCenter(pos);
    }
  };

  const error = (): any => {
    console.log('Error: The Geolocation service failed.');
  };

  const options = {
    enableHighAccuracy: false,
    maximumAge: 0,
  };

  const makeStartingPointHere = () => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(success, error, options);
    }
  };

  useEffect(() => {
    makeStartingPointHere();
  }, []);

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_API_KEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        zoom={16}
        onLoad={onLoad}
        onUnmount={onUnmount}
        center={center}
      >
        <Circle
          center={center}
          radius={10}
          options={driverPositionOption}
        />
      </GoogleMap>
    </LoadScript>
  );
}

export default DriverCurrentPositionMap;
