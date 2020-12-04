import React, { useState, useEffect } from 'react';

import { useApolloClient, useSubscription } from '@apollo/client';

import { matchedDriverState } from '../../queries/rider';
import { notifyRiderState } from '../../apis/riderAPI';

import PickUpMap from '../containers/PickUpMap';
import DriverInfoBox from '../containers/DriverInfoBox';

const INIT_POS = {
  lat: 37.8058,
  lng: -122.4782,
};

export default function RiderPickUpForm() {
  const client = useApolloClient();
  const { loading, error, data } = useSubscription(matchedDriverState);
  const [riderPos, setRiderPos] = useState(INIT_POS);

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
    enableHighAccuracy: false,
    maximumAge: 0,
  };

  const getRiderPosition = () => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(success, navError, options);
    }
  };

  useEffect(() => {
    getRiderPosition();
  }, []);

  useEffect(() => {
    const riderState = {
      tripId: sessionStorage.getItem('tripId'),
      latitude: riderPos.lat,
      longitude: riderPos.lng,
    };
    notifyRiderState(client, riderState);
  }, [riderPos]);

  if (error) {
    return <p>error</p>;
  }
  if (loading) {
    return <p>드라이버 위치정보를 불러오는 중입니다</p>;
  }

  //TODO: pickup 위치 및 드라이버 정보 tripId로 조회
  return (
    <>
      <PickUpMap
        isRider={true}
        riderLat={riderPos.lat}
        riderLng={riderPos.lng}
        driverLat={data.matchedDriverState.driverPosition.lat}
        driverLng={data.matchedDriverState.driverPosition.lng}
        pickUpLat={37.8077879}
        pickUpLng={-122.4748409}
      />
      <DriverInfoBox />
    </>
  );
}

