import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useApolloClient, useSubscription } from '@apollo/client';

import { driverListen } from '../queries/callRequest';
import { getTripStatus } from '../apis/tripAPI';

import DriverCurrentPositionMap from '../components/containers/DriverCurrentPositionMap';
import DriverPopup from '../components/presentational/DriverPopup';
import { DRIVER_MATCHING_SUCCESS, DRIVER_POPUP, DRIVER_IGNORED, DRIVER_WAITING } from '../constants/driverStatus';

function DriverWaitingPage() {
  //TODO: 이 페이지 전체를 container로 이동
  const client = useApolloClient();
  const history = useHistory();
  const { loading, error, data } = useSubscription(driverListen);
  const [riderCalls, setRiderCalls] = useState([]);
  const [trip, setTrip] = useState({ id: undefined }); //TODO: type 다시 지정
  const [driverStatus, setDriverStatus] = useState(DRIVER_WAITING);
  const [pickUpAddress, setPickUpAddress] = useState('');
  const [destinationAddress, setDestinationAddress] = useState('');

  if (error) {
    console.log(error);
  }

  useEffect(() => {
    if (data && driverStatus !== DRIVER_MATCHING_SUCCESS) {
      setRiderCalls([...riderCalls, data]);
    }
  }, [data]);

  useEffect(() => {
    if (data) {
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
    //TODO: trip 의 id
    getTripStatus(client, { id: '5fc7a18bab179a163b73302b' }, setDriverStatus);
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

  return (
    <>
      {/* {driverStatus === DRIVER_POPUP */}
      {pickUpAddress !== '' &&
      <DriverPopup
        pickUpAddress={pickUpAddress}
        destinationAddress={destinationAddress}
        setDriverStatus={setDriverStatus}
      />}
      <DriverCurrentPositionMap />
    </>
  );
}

export default DriverWaitingPage;
