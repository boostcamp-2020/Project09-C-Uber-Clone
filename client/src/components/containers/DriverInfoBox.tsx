import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useMutation, useQuery } from '@apollo/client';

import styled from 'styled-components';

import { selectTripReducer } from '../../slices/tripSlice';

import { GET_TRIP } from '../../queries/trip';

const Modal = styled.div`
  width: 100%;
  height: 25vh;
  margin: auto;
  padding: 20px;
  background-color: white;
`;

const DriverInfo = styled.div`
  margin: 10px 0 24px 0;
  display: flex;
  justify-content: space-between;
`;

const DriverName = styled.div`
  text-align: left;
  font-size: 18px;
  font-weight: bold;
`;

const CarInfo = styled.div`
  padding: 8px;
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

const ChatButton = styled.button`
    width: 54%;
    height: 50px;
    background-color: #56A902;
    color: #ffffff;
    border:none;
    border-radius: 15px;
`;

const CancelButton = styled.button`
    width: 45%;
    height: 50px;
    background-color: #ffffff;
    border: 0.5px solid #e0e0e0;
    border-radius: 15px;
`;

function DriverInfoBox() {
  const { trip } = useSelector(selectTripReducer);
  const { data: tripData } = useQuery(GET_TRIP, { variables: { id: trip.id } });
  const [driver, setDriver] = useState({ name: '', carType: '', plateNumber: '' });

  useEffect(() => {
    if (tripData) {
      setDriver(tripData.trip.driver);
    }
  }, [tripData]);

  return (
    <>
      <Modal>
        <DriverInfo>
          <DriverName>
            {driver.name}
          </DriverName>
          <CarInfo>
            <div>{driver.plateNumber}</div>
            <div>{driver.carType}</div>
          </CarInfo>
        </DriverInfo>
        <Buttons>
          <ChatButton>채팅하기</ChatButton>
          <CancelButton>취소하기</CancelButton>
        </Buttons>
      </Modal>
    </>
  );
}

export default DriverInfoBox;
