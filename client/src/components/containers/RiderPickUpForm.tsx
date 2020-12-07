import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useApolloClient, useSubscription } from '@apollo/client';

import { matchedDriverState } from '../../queries/rider';
import { notifyRiderState } from '../../apis/riderAPI';
import { getTripInfo } from '../../apis/tripAPI';

import PickUpMap from '../containers/PickUpMap';
import DriverInfoBox from '../containers/DriverInfoBox';
import { selectMapReducer } from '../../slices/mapSlice';
import { selectTripReducer } from '../../slices/tripSlice';

const INIT_POS = {
  lat: 37.8058,
  lng: -122.4782,
};

export default function RiderPickUpForm() {
  const client = useApolloClient();
  const dispatch = useDispatch();
  const { loading, error, data } = useSubscription(matchedDriverState);
  const [riderPos, setRiderPos] = useState(INIT_POS);
  const [count, setCount] = useState(0);
  const { originPosition, destPosition }: any = useSelector(selectMapReducer);
  const { trip }: any = useSelector(selectTripReducer);

  const { loading, error, data } = useSubscription(
    matchedDriverState,
    { variables: { tripId: trip.id } },
  );

  const success = (position: Position): any => {
    const pos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };
    setRiderPos(pos);
  };

  const navError = (): any => {
    console.log('Error: The Geolocation service failed.');
  };

  const options = {
    enableHighAccuracy: true,
    maximumAge: 0,
  };

  const getRiderPosition = () => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(success, navError, options);
    }
  };

  useEffect(() => {
    getRiderPosition();
    setTimeout(() => {
      setCount(count + 1);
    }, 1000);
  }, [count]);

  useEffect(() => {
    const riderState = {
      tripId: trip.id,
      latitude: riderPos.lat,
      longitude: riderPos.lng,
    };
    notifyRiderState(client, riderState);
  }, [riderPos]);

  useEffect(() => {
    localStorage.setItem('tripId', trip.id);
    getTripInfo(client, dispatch, trip.id);
  }, []);

  if (error) {
    return <p>error</p>;
  }
  if (loading) {
    return <p>드라이버 위치정보를 불러오는 중입니다</p>;
  }

  return (
    <>
      <PickUpMap
        isRider={true}
        riderLat={riderPos.lat}
        riderLng={riderPos.lng}
        driverLat={data.matchedDriverState.driverPosition.lat}
        driverLng={data.matchedDriverState.driverPosition.lng}
        pickUpLat={originPosition.lat}
        pickUpLng={originPosition.lng}
      />
      <DriverInfoBox />
    </>
  );
}

