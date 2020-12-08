import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useQuery, useSubscription } from '@apollo/client';

import { LISTEN_MATCHED_DRIVER_STATE } from '../../queries/rider';
import { GET_ORIGIN_POSITION_AND_DESTINATION_POSITION } from '../../queries/trip';

import DrivingMap from '../containers/DrivingMap';
import RiderInfoBox from '../containers/RiderInfoBox';
import TripInfoBox from '../presentational/TripInfoBox';
import { selectTripReducer } from '../../slices/tripSlice';
import { selectMapReducer } from '../../slices/mapSlice';
import { useHistory } from 'react-router-dom';

export default function DrivingForm({ isRider }:{isRider:boolean}) {
  const history = useHistory();
  const [currentPos, setCurrentPos] = useState({ lat: undefined, lng: undefined });
  const [destPos, setDestPos] = useState({ lat: undefined, lng: undefined });
  const { trip }: any = useSelector(selectTripReducer);

  const { data: tripData } = useQuery(GET_ORIGIN_POSITION_AND_DESTINATION_POSITION,
    { variables: { id: trip.id } });

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

  const getCurrentPos = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, navError, options);
      return navigator.geolocation.watchPosition(success, navError, options);
    }
  };

  useEffect(() => {
    const locationWatch = getCurrentPos();
    return () =>
      navigator.geolocation.clearWatch(locationWatch);
  }, []);

  useEffect(() => {
    if (tripData) {
      setDestPos({ lat: tripData.trip.destination.latitude, lng: tripData.trip.destination.longitude });
    }
  }, [tripData]);

  useEffect(() => {
    if (data && data.matchedDriverState.isDrop) {
      //TODO: 평가 페이지로 이동
      history.push('/');
    }
  }, [data]);

  return (
    <>
      {currentPos.lat &&
      destPos.lat &&
      <DrivingMap
        car={currentPos}
        destination={destPos}
      />}
      {isRider ? <TripInfoBox /> : <RiderInfoBox onBoard={true}/>}
    </>
  );
}
