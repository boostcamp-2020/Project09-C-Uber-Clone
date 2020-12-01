import React, { useState, useCallback, useEffect } from 'react';

import { GoogleMap, Circle, OverlayView } from '@react-google-maps/api';

import carImg from '../../../assets/car.png';
import styled from 'styled-components';

const containerStyle = {
  width: '100%',
  height: '75vh',
};

const INIT_POS = {
  lat: 37.55,
  lng: 126.97,
};

const Car = styled.img`
  position: absolute;
  width: 40px;
  z-index: 100;
`;

function PickUpMap() {
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

  const getDriverPosition = () => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(success, error, options);
    }
  };

  useEffect(() => {
    getDriverPosition();
  }, []);

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      zoom={16}
      onLoad={onLoad}
      onUnmount={onUnmount}
      center={center}
    >
      <OverlayView
        position={center}
        mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
      >
        <Car src={carImg}/>
      </OverlayView>
    </GoogleMap>
  );
}

export default PickUpMap;
