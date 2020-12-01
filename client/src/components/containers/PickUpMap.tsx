import React, { useState, useCallback, useEffect } from 'react';

import { GoogleMap, OverlayView } from '@react-google-maps/api';

import CarIcon from '../presentational/CarIcon';
import CurrentLocationIcon from '../presentational/CurrentLocationIcon';
import PinIcon from '../presentational/PinIcon';

const containerStyle = {
  width: '100%',
  height: '75vh',
};

const INIT_POS = {
  lat: 34.040,
  lng: -118.246,
};

const INIT_DRIVER_POS = {
  lat: 34.047,
  lng: -118.249,
};

const INIT_PICKUP_POS = {
  lat: 34.040,
  lng: -118.246,
};

function PickUpMap({ isRider }:{isRider:boolean}) {
  const [map, setMap] = useState(null);
  const [center, setCenter] = useState(INIT_POS);
  const [driverPos, setDriverPos] = useState(INIT_DRIVER_POS);
  const [pickUpPos, setPickUpPos] = useState(INIT_PICKUP_POS);

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
      if (!isRider) {
        setDriverPos(pos);
      };
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
      center={center}
    >
      <OverlayView
        position={driverPos}
        mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
      >
        <CarIcon />
      </OverlayView>
      <OverlayView
        position={pickUpPos}
        mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
      >
        <PinIcon />
      </OverlayView>
      {isRider && <OverlayView
        position={center}
        mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
      >
        <CurrentLocationIcon />
      </OverlayView>}
    </GoogleMap>
  );
}

export default PickUpMap;
