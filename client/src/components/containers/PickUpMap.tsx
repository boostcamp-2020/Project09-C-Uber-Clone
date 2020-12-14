import React, { useState, useEffect } from 'react';

import { GoogleMap, OverlayView } from '@react-google-maps/api';

import CarIcon from '../presentational/CarIcon';
import CurrentLocationIcon from '../presentational/CurrentLocationIcon';
import PinIcon from '../presentational/PinIcon';
import PersonIcon from '../presentational/PersonIcon';

const containerStyle = {
  width: '100%',
  height: '75vh',
};

export default function PickUpMap({ isRider, riderLat, riderLng, driverLat, driverLng, pickUpLat, pickUpLng }: {isRider: boolean, riderLat: number, riderLng: number, driverLat: number, driverLng: number, pickUpLat: number, pickUpLng: number}) {
  const [driverPos, setDriverPos] = useState({
    lat: driverLat,
    lng: driverLng,
  });
  const [pickUpPos, setPickUpPos] = useState({
    lat: pickUpLat,
    lng: pickUpLng,
  });
  const [riderPos, setRiderPos] = useState({
    lat: riderLat,
    lng: riderLng,
  });

  useEffect(() => {
    setDriverPos({
      lat: driverLat,
      lng: driverLng,
    });
  }, [driverLat]);

  useEffect(() => {
    setRiderPos({
      lat: riderLat,
      lng: riderLng,
    });
  }, [riderLat]);

  useEffect(() => {
    setPickUpPos({
      lat: pickUpLat,
      lng: pickUpLng,
    });
  }, [pickUpLat]);

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      zoom={16}
      center={isRider ? riderPos : driverPos}
      options={{
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: true,
        streetViewControl: true,
        rotateControl: true,
        fullscreenControl: false,
      }}
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
      <OverlayView
        position={riderPos}
        mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
      >
        {isRider ? <CurrentLocationIcon /> : <PersonIcon />}
      </OverlayView>
    </GoogleMap>
  );
}
