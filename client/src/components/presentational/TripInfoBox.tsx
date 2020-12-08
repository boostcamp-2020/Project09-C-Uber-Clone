import { useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

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

const TripInfo = styled.div`
  height: 100%;
  display: flex;
  justify-content: space-between;
`;

const Time = styled.div`
  width:47%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  > div {
    text-align: right;
  }
`;

const Route = styled.div`
  width: 1px; 
  background-color: #56A902;
`;

const Place = styled.div`
  width:47%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  > div {
    text-align: left;
  }
`;

function TripInfoBox() {
  const { trip }:any = useSelector(selectTripReducer);
  const { data } = useQuery(GET_TRIP, { variables: { id: trip.id } });

  return (
    <>
      <Modal>
        <TripInfo>
          <Time>
            <div>출발 시각</div>
            <div>도착 예정 시간</div>
          </Time>
          <Route />
          <Place>
            <div>{data?.trip.origin.address}</div>
            <div>{data?.trip.destination.address}</div>
          </Place>
        </TripInfo>
      </Modal>
    </>
  );
}

export default TripInfoBox;
