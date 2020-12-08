import React, { useCallback, useState } from 'react';

import { GoogleMap, OverlayView, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';

import CarIcon from '../presentational/CarIcon';
import PinIcon from '../presentational/PinIcon';


enum TravelMode {
  BICYCLING = 'BICYCLING',
  DRIVING = 'DRIVING',
  TRANSIT = 'TRANSIT',
  TWO_WHEELER = 'TWO_WHEELER',
  WALKING = 'WALKING',
}

const containerStyle = {
  width: '100%',
  height: '75vh',
};

export default function DrivingMap({ car, destination }: {car: {lat:number, lng:number}, destination: {lat:number, lng:number}}) {
  const [directionResponse, setDirectionResponse] = useState(null);

  const directionCallback = useCallback((response: any, status: any) => {
    if (response !== null && status === 'OK') {
      setDirectionResponse(response);
    };
  }, [car]);

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      zoom={16}
      center={car}
    >
      <OverlayView
        position={car}
        mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
      >
        <CarIcon />
      </OverlayView>
      <OverlayView
        position={destination}
        mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
      >
        <PinIcon />
      </OverlayView>

      <DirectionsService
        options={{
          destination: destination,
          origin: car,
          travelMode: TravelMode.DRIVING,
        }}
        callback={directionCallback}
      />

      <DirectionsRenderer
        options={{
          directions: directionResponse,
          markerOptions: {
            visible: false,
          },
          polylineOptions: {
            strokeColor: '#000000',
          },
        }}
      />

    </GoogleMap>
  );
}
