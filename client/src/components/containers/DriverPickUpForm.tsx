import React, { useState, useEffect } from 'react';

import { useApolloClient, useSubscription } from '@apollo/client';

import { driverStateNotify } from '../../apis/driverAPI';
import { matchedRiderStateQuery } from '../../queries/driver';

import PickUpMap from '../containers/PickUpMap';
import RiderInfoBox from '../containers/RiderInfoBox';

const INIT_POS = {
  lat: 34.047,
  lng: -118.249,
};

export default function DriverPickUpForm() {
  const client = useApolloClient();
  const [driverPos, setDriverPos] = useState(INIT_POS);
  const { loading, error, data } = useSubscription(
    matchedRiderStateQuery,
    { variables: { tripId: '1' } },
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

  useEffect(() => {
    const driverState = {
      tripId: '1',
      driverId: 'driver@test.com',
      riderId: 'rider@test.com',
      driverPosition: driverPos,
      isDrop: false,
    };
    driverStateNotify(client, driverState);
  }, [driverPos]);

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
        pickUpLat={35.689487}
        pickUpLng={139.691706}
      />
      <RiderInfoBox />
    </>
  );
}

