import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Modal } from 'antd-mobile';
import styled from 'styled-components';
import { useSubscription, useLazyQuery, useMutation } from '@apollo/client';

import { GET_TRIP_STATUS } from '../queries/trip';
import { ADD_DRIVER_POSITION } from '../queries/driver';
import { LISTEN_DRIVER_CALL } from '../queries/callRequest';

import { DRIVER_MATCHING_SUCCESS, DRIVER_POPUP, DRIVER_IGNORED, DRIVER_WAITING } from '../constants/driverStatus';
import { OPEN } from '../constants/tripStatus';

import DriverCurrentPositionMap from '../components/containers/DriverCurrentPositionMap';
import DriverPopup from '../components/presentational/DriverPopup';
import LogoutButton from '../components/presentational/LogoutButton';

const LogoutPosition = styled.div`
  position: absolute;
  right: 8px;
  top: 12px;
`;

const DRIVER_POSITION_UPDATE_TIME = 1000;

function DriverWaitingPage() {
  //TODO: 이 페이지 전체를 container로 이동
  const history = useHistory();

  const [riderCalls, setRiderCalls] = useState([]);
  const [trip, setTrip] = useState({
    id: undefined,
    rider: undefined,
    origin: undefined,
    destination: undefined,
    startTime: undefined,
    status: undefined,
    estimatedTime: undefined,
    estimatedDistance: undefined,
  },
  ); //TODO: type 다시 지정
  const [driverStatus, setDriverStatus] = useState(DRIVER_WAITING);
  const [count, setCount] = useState(0);
  const [driverPos, setDriverPos] = useState({ lat: 0, lng: 0 });

  const { data: driverListenData } = useSubscription(LISTEN_DRIVER_CALL);
  const [getTripStatus, { data: tripStatusData }] = useLazyQuery(GET_TRIP_STATUS, { fetchPolicy: 'no-cache' });
  const [updateDriverPosition] = useMutation(ADD_DRIVER_POSITION, { variables: driverPos });

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

  const logoutButtonHandler = () => {
    Modal.alert(
      '로그아웃',
      '',
      [
        { text: 'Cancel' },
        { text: 'Ok', onPress: logout },
      ]);
  };

  const logout = () => {
    localStorage.removeItem('token');
    history.push('/login');
  };

  useEffect(() => {
    if (driverListenData && driverStatus !== DRIVER_MATCHING_SUCCESS) {
      setRiderCalls([...riderCalls, driverListenData.driverListen.trip]);
    }
  }, [driverListenData]);

  useEffect(() => {
    if (driverStatus === DRIVER_WAITING && riderCalls[0]) {
      setTrip(riderCalls[0]);
      getTripStatus({ variables: { id: riderCalls[0].id } });
    }
  }, [riderCalls]);

  useEffect(() => {
    if (!!tripStatusData && tripStatusData.tripStatus === OPEN) {
      setDriverStatus(DRIVER_POPUP);
      return;
    }
    setDriverStatus(DRIVER_IGNORED);
  }, [tripStatusData]);

  useEffect(() => {
    if (driverStatus === DRIVER_IGNORED) {
      setDriverStatus(DRIVER_WAITING);
      setRiderCalls(riderCalls.slice(1));
    }
    if (driverStatus === DRIVER_MATCHING_SUCCESS) {
      setRiderCalls([]);
      localStorage.setItem('tripId', trip.id);
      history.push('/driver/pickup');
    }
  }, [driverStatus]);

  useEffect(() => {
    getDriverPosition();
    setTimeout(() => {
      setCount(count + 1);
      updateDriverPosition();
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
      <LogoutPosition>
        <LogoutButton
          width='20px'
          height='20px'
          color='rgba(0, 0, 0, 0.54)'
          background='white'
          onClick={logoutButtonHandler}
        />
      </LogoutPosition>
    </>
  );
}

export default DriverWaitingPage;
