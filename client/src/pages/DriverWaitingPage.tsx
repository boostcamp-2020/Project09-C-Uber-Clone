import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSubscription, useQuery, useApolloClient } from '@apollo/client';

import { GET_TRIP_STATUS } from '../queries/trip';

import { LISTEN_DRIVER_CALL } from '../queries/callRequest';

import { updateDriverPosition } from '../apis/driverAPI';

import DriverCurrentPositionMap from '../components/containers/DriverCurrentPositionMap';
import DriverPopup from '../components/presentational/DriverPopup';
import { DRIVER_MATCHING_SUCCESS, DRIVER_POPUP, DRIVER_IGNORED, DRIVER_WAITING } from '../constants/driverStatus';

import { OPEN } from '../constants/tripStatus';

const DRIVER_POSITION_UPDATE_TIME = 1000;

function DriverWaitingPage() {
  //TODO: 이 페이지 전체를 container로 이동
  const client = useApolloClient();
  const history = useHistory();

  const [riderCalls, setRiderCalls] = useState([]);
  const [trip, setTrip] = useState({
    id: undefined,
    rider: undefined,
    origin: undefined,
    destination: undefined,
    startTime: undefined,
    status: undefined },
  ); //TODO: type 다시 지정
  const [driverStatus, setDriverStatus] = useState(DRIVER_WAITING);
  const [count, setCount] = useState(0);
  const [driverPos, setDriverPos] = useState({ lat: 0, lng: 0 });

  const { data: driverListen } = useSubscription(LISTEN_DRIVER_CALL);
  const { loading, error, data: tripStatus } = useQuery(GET_TRIP_STATUS, { variables: trip });

  const getDriverPosition = () => {
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

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, navError, options);
    }
  };

  useEffect(() => {
    if (driverListen && driverStatus !== DRIVER_MATCHING_SUCCESS) {
      setRiderCalls([...riderCalls, driverListen.driverListen.trip]);
    }
  }, [driverListen]);

  useEffect(() => {
    if (driverStatus === DRIVER_WAITING && riderCalls[0]) {
      setTrip(riderCalls[0]);
    }
  }, [riderCalls]);

  useEffect(() => {
    if (!!tripStatus && tripStatus.tripStatus === OPEN) {
      setDriverStatus(DRIVER_POPUP);
      return;
    }
    setDriverStatus(DRIVER_IGNORED);
  }, [tripStatus]);

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
