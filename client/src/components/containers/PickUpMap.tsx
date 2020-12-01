import React, { useState, useCallback, useEffect } from 'react';

import { GoogleMap, Circle, OverlayView } from '@react-google-maps/api';

import styled from 'styled-components';

import carImg from '../../../assets/car.png';
import currentLocationImg from '../../../assets/current-location.png';

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

const CurrentLocation = styled.img`
  position: absolute;
  width: 40px;
  z-index: 100;
`;

const riderPositionOption = {
  strokeColor: '#56A902',
  strokeOpacity: 0.8,
  strokeWeight: 2,
  fillColor: '#56A902',
  fillOpacity: 0.35,
  clickable: false,
  draggable: false,
  editable: false,
  visible: true,
  zIndex: 1,
};

function PickUpMap({ isDriver }:{isDriver:boolean}) {
  const [map, setMap] = useState(null);
  const [center, setCenter] = useState(INIT_POS);
  const [userPos, setUserPos] = useState(INIT_POS);
  const [matcherUserPos, setMatchedUserPos] = useState(INIT_POS);

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
    if (JSON.stringify(userPos) !== JSON.stringify(pos)) {
      setUserPos(pos);
    }
  };

  const error = (): any => {
    console.log('Error: The Geolocation service failed.');
  };

  const options = {
    enableHighAccuracy: false,
    maximumAge: 0,
  };

  const getUserPosition = () => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(success, error, options);
    }
  };

  useEffect(() => {
    getUserPosition();
  }, []);

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      zoom={16}
      onLoad={onLoad}
      onUnmount={onUnmount}
      center={userPos}
    >
      <OverlayView
        position={isDriver ? userPos : matcherUserPos}
        mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
      >
        <Car src={carImg}/>
      </OverlayView>
      <OverlayView
        position={isDriver ? matcherUserPos : userPos}
        mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
      >
        <CurrentLocation src={currentLocationImg}/>
      </OverlayView>
    </GoogleMap>
  );
}

export default PickUpMap;
