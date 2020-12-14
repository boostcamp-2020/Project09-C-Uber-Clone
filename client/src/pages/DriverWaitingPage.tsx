import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Modal } from 'antd-mobile';
import styled from 'styled-components';
import { useSubscription, useLazyQuery, useMutation } from '@apollo/client';

import { GET_TRIP_STATUS } from '../queries/trip';
import { ADD_DRIVER_POSITION } from '../queries/driver';
import { LISTEN_DRIVER_CALL } from '../queries/callRequest';

import { setTrip } from '../slices/tripSlice';

import { DRIVER_MATCHING_SUCCESS, DRIVER_POPUP, DRIVER_IGNORED, DRIVER_WAITING } from '../constants/driverStatus';
import { OPEN } from '../constants/tripStatus';

import DriverCurrentPositionMap from '../components/containers/DriverCurrentPositionMap';
import DriverPopup from '../components/presentational/DriverPopup';
import LogoutButton from '../components/presentational/LogoutButton';
import { useDispatch } from 'react-redux';
import NoticeModal from '../components/presentational/NoticeModal';

const LogoutPosition = styled.div`
  position: absolute;
  right: 8px;
  top: 12px;
`;

const DRIVER_POSITION_UPDATE_TIME = 1000;

function DriverWaitingPage() {
  const history = useHistory();
  const dispatch = useDispatch();

  const [riderCalls, setRiderCalls] = useState([]);
  const [currentTrip, setCurrentTrip] = useState({
    id: undefined,
    rider: undefined,
    origin: undefined,
    destination: undefined,
    startTime: undefined,
    status: undefined,
    estimatedTime: undefined,
    estimatedDistance: undefined,
  },
  );
  const [driverStatus, setDriverStatus] = useState(DRIVER_WAITING);
  const [count, setCount] = useState(0);
  const [driverPos, setDriverPos] = useState({ lat: 0, lng: 0 });
  const [newDriverPos, setNewDriverPos] = useState({ lat: 0, lng: 0 });

  const { data: driverListenData } = useSubscription(LISTEN_DRIVER_CALL);
  const [getTripStatus, { data: tripStatusData }] = useLazyQuery(GET_TRIP_STATUS, { fetchPolicy: 'network-only' });
  const [updateDriverPosition] = useMutation(ADD_DRIVER_POSITION, { variables: driverPos });

  const getDriverPosition = () => {
    const success = (position: Position): any => {
      const pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      if (driverPos.lat === 0 && driverPos.lng === 0) {
        setDriverPos(pos);
      }
      setNewDriverPos(pos);
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
      setCurrentTrip(riderCalls[0]);
      getTripStatus({ variables: { id: riderCalls[0].id } });
    }
  }, [riderCalls]);

  useEffect(() => {
    if (!!tripStatusData && tripStatusData.trip.status === OPEN) {
      setDriverStatus(DRIVER_POPUP);
      return;
    }
    if (driverStatus !== DRIVER_POPUP) {
      setDriverStatus(DRIVER_IGNORED);
    }
  }, [tripStatusData]);

  useEffect(() => {
    if (driverStatus === DRIVER_IGNORED) {
      setDriverStatus(DRIVER_WAITING);
      setRiderCalls(riderCalls.slice(1));
    }
    if (driverStatus === DRIVER_MATCHING_SUCCESS) {
      dispatch(setTrip({ id: currentTrip.id }));
      setRiderCalls([]);
      history.push('/driver/pickup');
    }
  }, [driverStatus]);

  useEffect(() => {
    getDriverPosition();
    setTimeout(() => {
      setCount(count + 1);
      if (JSON.stringify(newDriverPos) !== JSON.stringify(driverPos)) {
        updateDriverPosition();
        setDriverPos(newDriverPos);
      }
    }, DRIVER_POSITION_UPDATE_TIME);
  }, [count]);

  return (
    <>
      {driverStatus === DRIVER_POPUP &&
      <DriverPopup
        trip={currentTrip}
        setDriverStatus={setDriverStatus}
      />}
      <NoticeModal lat={driverPos.lat} lng={driverPos.lng}/>
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
