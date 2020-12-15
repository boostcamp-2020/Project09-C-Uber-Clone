import React, { useCallback, useState, useRef, useEffect, memo } from 'react';

import { OverlayView, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';

import CarIcon from '../presentational/CarIcon';
import PinIcon from '../presentational/PinIcon';

function DrivingMap({ car, destination }: {car: {lat:number, lng:number}, destination: {lat:number, lng:number}}) {
  const [directionResponse, setDirectionResponse] = useState(null);
  const count = useRef(0);

  const directionCallback = useCallback((response: any, status: any) => {
    if (response !== null && status === 'OK' && count.current <= 1) {
      count.current += 1;
      setDirectionResponse(response);
    };
  }, [car.lat, car.lng]);

  useEffect(() => {
    count.current = 0;
  }, [car.lat, car.lng, destination.lat, destination.lng]);


  return (
    <>
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
          travelMode: google.maps.TravelMode.DRIVING,
        }}
        callback={directionCallback}
      />
      {directionResponse &&
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
      }
    </>
  );
}

export default memo(DrivingMap);
