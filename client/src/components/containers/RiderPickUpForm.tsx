import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSubscription, useMutation, useQuery } from '@apollo/client';

import { LISTEN_MATCHED_DRIVER_STATE, NOTIFY_RIDER_STATE } from '../../queries/rider';
import { GET_ORIGIN_POSITION_AND_DESTINATION_POSITION } from '../../queries/trip';

import { setOriginPosition, setDestPosition } from '../../slices/mapSlice';
import PickUpMap from '../containers/PickUpMap';
import DriverInfoBox from '../containers/DriverInfoBox';
import { selectMapReducer } from '../../slices/mapSlice';
import { selectTripReducer } from '../../slices/tripSlice';
import { useHistory } from 'react-router-dom';

const INIT_POS = {
  lat: 37.8058,
  lng: -122.4782,
};

export default function RiderPickUpForm() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [riderPos, setRiderPos] = useState(INIT_POS);
  const [driverPos, setDriverPos] = useState(INIT_POS);
  const [count, setCount] = useState(0);
  const { originPosition }: any = useSelector(selectMapReducer);
  const { trip }: any = useSelector(selectTripReducer);

  const [notifyRiderState] = useMutation(NOTIFY_RIDER_STATE);

  useQuery(GET_ORIGIN_POSITION_AND_DESTINATION_POSITION, {
    variables: { id: trip.id },
    onCompleted: tripInfo => {
      dispatch(setOriginPosition({ lat: tripInfo.trip.origin.latitude, lng: tripInfo.trip.origin.longitude }));
      dispatch(setDestPosition({ lat: tripInfo.trip.destination.latitude, lng: tripInfo.trip.destination.longitude }));
    },
  });

  const { loading, error, data } = useSubscription(
    LISTEN_MATCHED_DRIVER_STATE,
    { variables: { tripId: trip.id } },
  );

  const success = (position: Position): any => {
    const pos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };
    setRiderPos(pos);
  };

  const navError = (): any => {
    console.log('Error: The Geolocation service failed.');
  };

  const options = {
    enableHighAccuracy: true,
    maximumAge: 0,
  };

  const getRiderPosition = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, navError, options);
    }
  };

  useEffect(() => {
    getRiderPosition();
    setTimeout(() => {
      setCount(count + 1);
    }, 1000);
  }, [count]);

  useEffect(() => {
    notifyRiderState({ variables: { tripId: trip.id, latitude: riderPos.lat, longitude: riderPos.lng } });
  }, [riderPos]);

  useEffect(() => {
    if (data && data.matchedDriverState.driverPosition) {
      setDriverPos(data.matchedDriverState.driverPosition);
    }
    if (data && data.matchedDriverState.onBoard) {
      history.push('/rider/driving');
    }
  }, [data]);

  if (error) {
    return <p>error</p>;
  }
  if (loading) {
    return <p>드라이버 위치정보를 불러오는 중입니다</p>;
  }

  return (
    <>
      <PickUpMap
        isRider={true}
        riderLat={riderPos.lat}
        riderLng={riderPos.lng}
        driverLat={driverPos.lat}
        driverLng={driverPos.lng}
        pickUpLat={originPosition.lat}
        pickUpLng={originPosition.lng}
      />
      <DriverInfoBox />
    </>
  );
}

