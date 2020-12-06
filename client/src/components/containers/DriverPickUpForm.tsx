import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useApolloClient, useSubscription } from '@apollo/client';

import { driverStateNotify } from '../../apis/driverAPI';
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
  const [driverPos, setDriverPos] = useState(INIT_POS);
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
      tripId: trip.id,
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
  //TODO: pickup 위치 및 라이더 정보 tripId로 조회
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

