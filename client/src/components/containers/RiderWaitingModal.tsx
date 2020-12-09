import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import styled from 'styled-components';

import CarLoadingImage from '../presentational/CarLoadingImage';
import PickUpCancelButton from '../presentational/PickUpCancelButton';

import { selectTripReducer, setTrip } from '../../slices/tripSlice';
import { RE_NOTIFY_RIDER_CALL } from '../../queries/callRequest';
import { CANCEL_TRIP, GET_TRIP_BEFORE_MATCHING } from '../../queries/trip';

import { selectMapReducer } from '../../slices/mapSlice';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 80%);
  z-index: 9;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Message = styled.div`
  position: absolute;
  bottom: 20%;
  right: 0;
  left: 0;
  padding: 16px 12px;
  background-color: transparent;
  z-index: 10;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  color: rgba(117, 215, 1, 0.6);
`;

interface TripPlace {
  address: string
  latitude: number
  longitude: number
}

interface NotifyCallVariables {
  origin: TripPlace
  destination: TripPlace
  startTime: string
  estimatedTime: string
  estimatedDistance: string
}

function RiderWaitingForm() {
  const history = useHistory();
  const dispatch = useDispatch();

  const [callToggle, setCallToggle] = useState(0);

  const { trip } = useSelector(selectTripReducer);

  const { data: tripData } = useQuery(GET_TRIP_BEFORE_MATCHING, { variables: { id: trip.id } });
  const [notifyCall] = useMutation(RE_NOTIFY_RIDER_CALL);
  const [cancelCall, { data }] = useMutation(CANCEL_TRIP);

  useEffect(() => {
    console.log(tripData);
  }, [tripData]);

  useEffect(() => {
    if (callToggle === 1) {
      // const {latitude, longitude, address} = tripData.trip.destination
      // const variables: NotifyCallVariables = {
      //   origin: { latitude: tripData.trip.origin.latitude, address: tripData.trip.origin.address, longitude: tripData.trip.origin.longitude },
      //   destination: { latitude: tripData.trip.destination.latitude, longitude: tripData.trip.destination.longitude, address: tripData.trip.destination.address },
      //   startTime: tripData.trip.startTime,
      //   estimatedTime: tripData.trip.estimatedTime,
      //   estimatedDistance: tripData.trip.estimatedDistance,
      // };
      notifyCall({ variables: { id: trip.id } });
    } else if (callToggle > 1) {
      const tripId = trip.id;
      cancelCall({ variables: { id: tripId } });
    }
    const timerId = setTimeout(retryNotify, 10000);
    return () => {
      clearTimeout(timerId);
    };
  }, [callToggle]);

  const retryNotify = () => {
    if (callToggle === 0) {
      setCallToggle(callToggle + 1);
      window.alert('범위를 넓혀 재시도합니다.');
    } else {
      setCallToggle(callToggle + 1);
      window.alert('시간이 초과되어 호출을 취소합니다.');
    }
  };

  const handleClickCancel = () => {
    const tripId = trip.id;
    cancelCall({ variables: { id: tripId } });
  };

  useEffect(() => {
    if (data && data.cancelTrip.result === 'canceled') {
      dispatch(setTrip({ id: '' }));
      history.push('/rider/setcourse');
    }
  }, [data]);

  return (
    <>
      <Overlay >
        <CarLoadingImage />
      </Overlay>
      <PickUpCancelButton content={'호출 취소'} onClick={handleClickCancel}/>
      <Message >Searching for a driver..</Message>
    </>
  );
}

export default RiderWaitingForm;
