import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useApolloClient, useSubscription } from '@apollo/client';

import { driverListenSubscription } from '../queries/callRequest';
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
  const { data } = useSubscription(driverListenSubscription);
  const [riderCalls, setRiderCalls] = useState([]);
  const [trip, setTrip] = useState({ id: undefined, rider: undefined, origin: undefined, destination: undefined, startTime: undefined, status: undefined }); //TODO: type 다시 지정
  const [driverStatus, setDriverStatus] = useState(DRIVER_WAITING);
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
      setRiderCalls([...riderCalls, data.driverListen.trip]);
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
        trip={trip}
        setDriverStatus={setDriverStatus}
      />}
      <DriverCurrentPositionMap driverPos={driverPos}/>
    </>
  );
}

export default DriverWaitingPage;
