import { useQuery } from '@apollo/client';
import React from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';

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
  justify-content: flex-start;
`;

const Trip = styled.div`
  padding: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Time = styled.div`
  color: gray;
`;

const PlaceAndTime = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  > div {
    text-align: left;
  }
`;

const Route = styled.div`
  width: 3px; 
  background-color: #56A902;
  margin-right: 5px;
`;


function TripInfoBox({ time }:{time:{startTime:number, arrivalTime?:number}}) {
  const { trip }:any = useSelector(selectTripReducer);
  const { data } = useQuery(GET_TRIP, { variables: { id: trip.id } });

  return (
    <>
      <Modal>
        <TripInfo>
          <Route />
          <Trip>
            <PlaceAndTime>
              <h4>출발지</h4>
              <div>{data?.trip.destination.address}</div>
              <Time>{moment(time.startTime).format('YYYY MM DD , h:mm:ss a')}</Time>
            </PlaceAndTime>
            <PlaceAndTime>
              <h4>도착지</h4>
              <div>{data?.trip.origin.address}</div>
              <Time>{ moment(time.arrivalTime).format('YYYY MM DD , h:mm:ss a')}</Time>
            </PlaceAndTime>
          </Trip>
        </TripInfo>
      </Modal>
    </>
  );
}

export default TripInfoBox;
