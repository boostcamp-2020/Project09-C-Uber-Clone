import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useApolloClient, useSubscription } from '@apollo/client';

import { getTripInfo } from '../../apis/tripAPI';
import { matchedRiderStateQuery } from '../../queries/driver';

import PickUpMap from '../containers/PickUpMap';
import RiderInfoBox from '../containers/RiderInfoBox';
import { selectMapReducer } from '../../slices/mapSlice';
import { selectTripReducer } from '../../slices/tripSlice';

const INIT_POS = {
  lat: 37.8035,
  lng: -122.46,
};

export default function DriverPickUpForm() {
  const client = useApolloClient();
  const dispatch = useDispatch();
  const [driverPos, setDriverPos] = useState(INIT_POS);
  const [count, setCount] = useState(0);
  const { originPosition, destPosition }: any = useSelector(selectMapReducer);
  const { trip }: any = useSelector(selectTripReducer);

  const { loading, error, data } = useSubscription(
    matchedRiderStateQuery,
    { variables: { tripId: trip.id } },
  );

  const success = (position: Position): any => {
    const pos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };
    setDriverPos(pos);
  };

  const navError = (): any => {
    console.log('Error: The Geolocation service failed.');
  };

  const options = {
    enableHighAccuracy: true,
    maximumAge: 0,
  };

  const getDriverPosition = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, navError, options);
    }
  };

  useEffect(() => {
    getDriverPosition();
    setTimeout(() => {
      setCount(count + 1);
    }, 1000);
  }, [count]);

  useEffect(() => {
    notifyDriverState({ variables: { tripId: trip.id, driverPosition: driverPos, isDrop: false } });
  }, [driverPos]);

  useEffect(() => {
    localStorage.setItem('tripId', trip.id);
    getTripInfo(client, dispatch, trip.id);
  }, []);

  if (error) {
    return <p>error</p>;
  }
  if (loading) {
    return <p>라이더 위치정보를 불러오는 중입니다</p>;
  }

  return (
    <>
      <PickUpMap
        isRider={false}
        riderLat={data.matchedRiderState.latitude}
        riderLng={data.matchedRiderState.longitude}
        driverLat={driverPos.lat}
        driverLng={driverPos.lng}
        pickUpLat={originPosition.lat}
        pickUpLng={originPosition.lng}
      />
      <RiderInfoBox />
    </>
  );
}

