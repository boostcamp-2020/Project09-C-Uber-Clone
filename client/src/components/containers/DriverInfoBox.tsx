import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation, useQuery } from '@apollo/client';

import { Modal } from 'antd-mobile';

import styled from 'styled-components';
import ProfileIcon from '../presentational/ProfileIcon';

import { selectTripReducer, setTrip } from '../../slices/tripSlice';

import { GET_TRIP, CANCEL_TRIP } from '../../queries/trip';
import { NOTIFY_RIDER_STATE } from '../../queries/rider';
import { useHistory } from 'react-router-dom';

const InfoBox = styled.div`
  width: 100%;
  height: 25vh;
  margin: auto;
  padding: 12px;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Info = styled.div`
  margin-bottom: 5px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const DriverName = styled.div`
  margin-left:5px;
  text-align: left;
  font-size: 20px;
  font-weight: bold;
`;

const CarInfo = styled.div`
  margin-bottom: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  > div {
    width: 50%;
    font-size: 14px;
    > span {
      width: 60%;
      display: inline-block;
      padding: 8px;
      background-color: #e0e0e0;
      border-radius: 12px;
      text-align: center;
      color: gray;
    }
  }
`;

const Buttons = styled.div`
    display: flex;
    justify-content: center;
`;

const CancelButton = styled.button`
    width: 54%;
    height: 50px;
    background-color: #ffffff;
    border: 0.5px solid #e0e0e0;
    border-radius: 15px;
`;

function DriverInfoBox() {
  const dispatch = useDispatch();
  const history = useHistory();
  const alert = Modal.alert;

  const { trip } = useSelector(selectTripReducer);
  const { data: tripData } = useQuery(GET_TRIP, { variables: { id: trip.id } });
  const [cancelCall, { data }] = useMutation(CANCEL_TRIP);
  const [notifyRiderState] = useMutation(NOTIFY_RIDER_STATE);

  const driver = useMemo(() => tripData ? { name: tripData.trip.driver.name, carType: tripData.trip.driver.carType, plateNumber: tripData.trip.driver.plateNumber } : { name: '', carType: '', plateNumber: '' }, [tripData]);

  const handleClickCancel = () => {
    alert('호출 취소', '드라이버 호출을 취소하시겠습니까?', [
      { text: 'Cancel' },
      { text: 'OK', onPress: () => cancelCall({ variables: { id: trip.id } }) },
    ]);
  };

  useEffect(() => {
    if (data && data.cancelTrip.result === 'canceled') {
      dispatch(setTrip({ id: '' }));
      notifyRiderState({ variables: { tripId: trip.id, isCancel: true } });
      alert('호출 취소', '취소 되었습니다.', [
        { text: 'OK', onPress: () => history.push('/rider/setcourse') },
      ]);
    }
  }, [data]);


  return (
    <InfoBox>
      <Info>
        <ProfileIcon />
        <DriverName>
          {driver.name}
        </DriverName>
      </Info>
      <CarInfo>
        <div>
          차량 번호 <span>{driver.plateNumber}</span>
        </div>
        <div>
          차량 종류 <span>{driver.carType}</span>
        </div>
      </CarInfo>
      <Buttons>
        <CancelButton onClick={handleClickCancel}>호출 취소</CancelButton>
      </Buttons>
    </InfoBox>
  );
}

export default DriverInfoBox;
