import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useSubscription } from '@apollo/client';

import { LISTEN_MATCHED_DRIVER_STATE } from '../../queries/rider';

import DrivingMap from '../containers/DrivingMap';
import RiderInfoBox from '../containers/RiderInfoBox';
import TripInfoBox from '../presentational/TripInfoBox';
import { selectTripReducer } from '../../slices/tripSlice';
import { selectMapReducer } from '../../slices/mapSlice';

export default function DriverPickUpForm({ isRider }:{isRider:boolean}) {
  const [currentPos, setCurrentPos] = useState({ lat: undefined, lng: undefined });
  const { trip }: any = useSelector(selectTripReducer);
  const { destPosition }: any = useSelector(selectMapReducer);

  const { loading, error, data } = useSubscription(
    LISTEN_MATCHED_DRIVER_STATE,
    { variables: { tripId: trip.id }, skip: !isRider },
  );

  const success = (position: Position): any => {
    const pos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };
    setCurrentPos(pos);
  };

  const navError = (): any => {
    console.log('Error: The Geolocation service failed.');
  };

  const options = {
    enableHighAccuracy: false,
    maximumAge: 0,
  };

  const getDriverPosition = () => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(success, navError, options);
    }
  };

  useEffect(() => {
    getDriverPosition();
  }, []);

  return (
    <>
      <DrivingMap
        car={currentPos}
        destination={destPosition}
      />
      {isRider ? <TripInfoBox /> : <RiderInfoBox />}
    </>
  );
}

