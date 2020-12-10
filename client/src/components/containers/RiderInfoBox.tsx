import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';

import { reverseGoecoding } from '../../utils/geocoding';
import { selectTripReducer } from '../../slices/tripSlice';

import styled from 'styled-components';
import ProfileIcon from '../presentational/ProfileIcon';

import { ADD_TRIP_STATUS, GET_TRIP, SET_ARRIVAL_DATA } from '../../queries/trip';
import { NOTIFY_DRIVER_STATE } from '../../queries/driver';


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

const RiderName = styled.div`
  margin-left: 5px;
  text-align: left;
  font-size:20px;
  font-weight: bold;
`;

const PlaceInfo = styled.div`
  margin-top:1px; 
  margin-bottom: 8px;
  padding: 8px;
  width: 100%;
  background-color: #e0e0e0;
  border-radius: 12px;
  font-size: 15px;
  text-align: center;
  color: gray;
  word-wrap: break-word;
`;

const Buttons = styled.div`
    display: flex;
    justify-content: center;
`;

const PickUpButton = styled.button`
    width: 54%;
    height: 50px;
    background-color: #56A902;
    color: #ffffff;
    border:none;
    border-radius: 15px;
`;

const DropButton = styled.button`
    width: 54%;
    height: 50px;
    background-color: #56A902;
    color: #ffffff;
    border:none;
    border-radius: 15px;
`;

function RiderInfoBox({ onBoard, currentPos }:{onBoard:boolean, currentPos:{ lat: number, lng: number }}) {
  const history = useHistory();

  const { trip } = useSelector(selectTripReducer);
  const [setTripStatus, { data }] = useMutation(ADD_TRIP_STATUS);
  const [notifyDriverState] = useMutation(NOTIFY_DRIVER_STATE);
  const [setArrival, { data: arrivalData }] = useMutation(SET_ARRIVAL_DATA);

  const updateArrivalData = async () => {
    const now = new Date();
    const address = await reverseGoecoding(currentPos);
    setArrival({ variables: {
      tripId: trip.id,
      arrivalTime: now,
      destination: {
        address: address,
        latitude: currentPos.lat,
        longitude: currentPos.lng,
      },
    } });
  };

  const { data: tripData } = useQuery(GET_TRIP, { variables: { id: trip.id } });

  const handleOnClickBoardCompelete = () => {
    const tripId = trip.id;
    setTripStatus({ variables: { tripId: tripId, newTripStatus: 'onBoard' } });
  };

  const handleOnClickDrop = () => {
    const tripId = trip.id;
    setTripStatus({ variables: { tripId, newTripStatus: 'close' } });
  };

  useEffect(() => {
    if (data && data.setTripStatus.result === 'success') {
      notifyDriverState({ variables: { tripId: trip.id, onBoard: true } });
      history.push('/driver/driving');
    }
    if (data && data.setTripStatus.result === 'close success') {
      updateArrivalData();
    }
  }, [data]);

  useEffect(() => {
    if (arrivalData) {
      notifyDriverState({ variables: { tripId: trip.id, isDrop: true } });
      history.push('/driver/tripend');
    }
  }, [arrivalData]);

  return (
    <>
      <Modal>
        <Info>
          <ProfileIcon />
          <RiderName>{tripData?.trip.rider.name}</RiderName>
        </Info>
        {onBoard ?
          <>
            <div>
              <div>목적지</div>
              <PlaceInfo>{ tripData?.trip.destination.address}</PlaceInfo>
            </div>
            <Buttons>
              <DropButton onClick={handleOnClickDrop}>라이더 하차</DropButton>
            </Buttons>
          </>
          :
          <>
            <div>
              <div>픽업 위치</div>
              <PlaceInfo>{tripData?.trip.origin.address}</PlaceInfo>
            </div>
            <Buttons>
              <PickUpButton onClick={handleOnClickBoardCompelete}>탑승완료</PickUpButton>
            </Buttons>
          </>
        }

      </Modal>
    </>
  );
}

export default RiderInfoBox;
