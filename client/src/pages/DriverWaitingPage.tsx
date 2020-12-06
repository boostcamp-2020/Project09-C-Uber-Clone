import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useApolloClient, useSubscription } from '@apollo/client';

import { driverListen } from '../queries/callRequest';

import { getTripStatus } from '../apis/tripAPI';
import { updateDriverPosition } from '../apis/driverAPI';

import DriverCurrentPositionMap from '../components/containers/DriverCurrentPositionMap';
import DriverPopup from '../components/presentational/DriverPopup';
import { DRIVER_MATCHING_SUCCESS, DRIVER_POPUP, DRIVER_IGNORED, DRIVER_WAITING } from '../constants/driverStatus';

const DRIVER_POSITION_UPDATE_TIME = 1000;

function DriverWaitingPage() {
  //TODO: 이 페이지 전체를 container로 이동
  const client = useApolloClient();
  const history = useHistory();
  const { data } = useSubscription(driverListen);
  const [riderCalls, setRiderCalls] = useState([]);
  const [trip, setTrip] = useState({ id: undefined }); //TODO: type 다시 지정
  const [driverStatus, setDriverStatus] = useState(DRIVER_WAITING);
  const [pickUpAddress, setPickUpAddress] = useState('');
  const [destinationAddress, setDestinationAddress] = useState('');
  const [count, setCount] = useState(0);
  const [driverPos, setDriverPos] = useState({ lat: 0, lng: 0 });

  const success = (position: Position): any => {
    const pos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };
    if (JSON.stringify(driverPos) !== JSON.stringify(pos)) {
      setDriverPos(pos);
    }
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
      navigator.geolocation.getCurrentPosition(success, navError, options);
    }
  };

  useEffect(() => {
    if (data && driverStatus !== DRIVER_MATCHING_SUCCESS) {
      setRiderCalls([...riderCalls, { id: data.driverListen.riderPublishInfo.tripId }]);
      setPickUpAddress(data.driverListen.riderPublishInfo.pickUpAddress);
      setDestinationAddress(data.driverListen.riderPublishInfo.destinationAddress);
    }
  }, [data]);

  useEffect(() => {
    if (driverStatus === DRIVER_WAITING && riderCalls[0]) {
      setTrip(riderCalls[0]);
    }
  }, [riderCalls]);

  useEffect(() => {
    if (trip.id) {
      getTripStatus(client, trip, setDriverStatus);
    }
  }, [trip]);

  useEffect(() => {
    if (driverStatus === DRIVER_IGNORED) {
      setDriverStatus(DRIVER_WAITING);
      setRiderCalls(riderCalls.slice(1));
    }
    if (driverStatus === DRIVER_MATCHING_SUCCESS) {
      setRiderCalls([]);
      //TODO: trip 정보 전역으로 저장
      history.push('/driver/pickup');
    }
  }, [driverStatus]);

  useEffect(() => {
    getDriverPosition();
    setTimeout(() => {
      setCount(count + 1);
      updateDriverPosition(client, driverPos);
    }, DRIVER_POSITION_UPDATE_TIME);
  }, [count]);

  useEffect(() => {
    getDriverPosition();
  }, []);

  return (
    <>
      {driverStatus === DRIVER_POPUP &&
      <DriverPopup
        riderId={data.driverListen.riderPublishInfo.riderId}
        tripId={trip.id}
        pickUpAddress={pickUpAddress}
        destinationAddress={destinationAddress}
        setDriverStatus={setDriverStatus}
      />}
      <DriverCurrentPositionMap driverPos={driverPos}/>
    </>
  );
}

export default DriverWaitingPage;
