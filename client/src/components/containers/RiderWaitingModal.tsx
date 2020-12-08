import React, { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import styled from 'styled-components';

import CarLoadingImage from '../presentational/CarLoadingImage';
import PickUpCancelButton from '../presentational/PickUpCancelButton';

import { selectTripReducer, setTrip } from '../../slices/tripSlice';
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

function RiderWaitingForm() {
  const history = useHistory();
  const dispatch = useDispatch();

  const [cancelCall, { data }] = useMutation(CANCEL_TRIP);
  const { trip } = useSelector(selectTripReducer);

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
