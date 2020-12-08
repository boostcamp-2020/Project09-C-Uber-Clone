import React from 'react';
import { useSelector } from 'react-redux';

import { useMutation } from '@apollo/client';

import { selectTripReducer } from '../../slices/tripSlice';

import styled from 'styled-components';

import { ADD_TRIP_STATUS } from '../../queries/trip';
const Modal = styled.div`
  width: 100%;
  height: 25vh;
  margin: auto;
  padding: 20px;
  background-color: white;
`;

const RiderName = styled.div`
  text-align: left;
  font-size: 18px;
  font-weight: bold;
`;

const PickUpInfo = styled.div`
  margin: 24px 0;
  padding: 8px 0;
  width: 100%;
  background-color: #e0e0e0;
  border-radius: 12px;
  font-size: 15px;
  text-align: center;
  color: gray;
`;

const Buttons = styled.div`
    display: flex;
    justify-content: space-between;
`;

const PickUpButton = styled.button`
    width: 54%;
    height: 50px;
    background-color: #56A902;
    color: #ffffff;
    border:none;
    border-radius: 15px;
`;

const ChatButton = styled.button`
    width: 45%;
    height: 50px;
    background-color: #ffffff;
    border: 0.5px solid #e0e0e0;
    border-radius: 15px;
`;

function RiderInfoBox() {
  const { trip } = useSelector(selectTripReducer);
  const [setTripStatus, { data }] = useMutation(ADD_TRIP_STATUS);

  const handleOnClickBoardCompelete = () => {
    const tripId = trip.id;
    setTripStatus({ variables: { tripId: tripId, newTripStatus: 'onBoard' } });
  };

  return (
    <>
      <Modal>
        <RiderName>라이더 이름</RiderName>
        <PickUpInfo>픽업 위치</PickUpInfo>
        <Buttons>
          <PickUpButton onClick={handleOnClickBoardCompelete}>탑승완료</PickUpButton>
          <ChatButton>채팅하기</ChatButton>
        </Buttons>
      </Modal>
    </>
  );
}

export default RiderInfoBox;
