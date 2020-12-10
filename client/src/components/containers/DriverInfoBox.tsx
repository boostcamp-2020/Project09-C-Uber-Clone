import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useQuery } from '@apollo/client';

import styled from 'styled-components';
import ProfileIcon from '../presentational/ProfileIcon';

import { selectTripReducer } from '../../slices/tripSlice';

import { GET_TRIP } from '../../queries/trip';

const Modal = styled.div`
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

const ChatButton = styled.button`
    width: 54%;
    height: 50px;
    background-color: #56A902;
    color: #ffffff;
    border:none;
    border-radius: 15px;
`;

const CancelButton = styled.button`
    width: 54%;
    height: 50px;
    background-color: #ffffff;
    border: 0.5px solid #e0e0e0;
    border-radius: 15px;
`;

function DriverInfoBox() {
  const { trip } = useSelector(selectTripReducer);
  const { data: tripData } = useQuery(GET_TRIP, { variables: { id: trip.id } });

  const driver = useMemo(() => tripData ? { name: tripData.trip.driver.name, carType: tripData.trip.driver.carType, plateNumber: tripData.trip.driver.plateNumber } : { name: '', carType: '', plateNumber: '' }, [tripData]);

  return (
    <>
      <Modal>
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
          {/* <ChatButton>채팅하기</ChatButton> */}
          <CancelButton>호출 취소</CancelButton>
        </Buttons>
      </Modal>
    </>
  );
}

export default DriverInfoBox;
