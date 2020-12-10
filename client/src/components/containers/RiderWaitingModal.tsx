import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import styled from 'styled-components';
import { Modal } from 'antd-mobile';

import CarLoadingImage from '../presentational/CarLoadingImage';
import PickUpCancelButton from '../presentational/PickUpCancelButton';

import { selectTripReducer, setTrip } from '../../slices/tripSlice';
import { RE_NOTIFY_RIDER_CALL } from '../../queries/callRequest';
import { CANCEL_TRIP } from '../../queries/trip';

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

function RiderWaitingForm() {
  const history = useHistory();
  const dispatch = useDispatch();

  const [callToggle, setCallToggle] = useState(0);
  const alert = Modal.alert;
  const { trip } = useSelector(selectTripReducer);

  const [notifyCall] = useMutation(RE_NOTIFY_RIDER_CALL);
  const [cancelCall, { data }] = useMutation(CANCEL_TRIP);

  useEffect(() => {
    if (callToggle === 1) {
      notifyCall({ variables: { id: trip.id } });
    } else if (callToggle > 1) {
      cancelCall({ variables: { id: trip.id } });
    }
    const timerId = setTimeout(retryNotify, 10000);
    return () => {
      clearTimeout(timerId);
    };
  }, [callToggle]);

  const retryNotify = () => {
    if (callToggle === 0) {
      setCallToggle(callToggle + 1);
    } else {
      alert('호출 취소', '호출 가능한 드라이버가 없습니다.', [
        { text: 'Ok', onPress: () => setCallToggle(callToggle + 1) },
      ]);
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
      <Message >{!!callToggle ? '범위를 넓혀 다시 탐색중...' : '주변 드라이버 탐색중...'}</Message>
    </>
  );
}

export default RiderWaitingForm;
