import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useQuery, useMutation, useSubscription } from '@apollo/client';

import { Modal } from 'antd-mobile';

import { setOriginPosition, setDestPosition } from '../../slices/mapSlice';
import { LISTEN_MATCHED_RIDER_STATE, NOTIFY_DRIVER_STATE } from '../../queries/driver';
import { GET_ORIGIN_POSITION_AND_DESTINATION_POSITION } from '../../queries/trip';

import PickUpMap from '../containers/PickUpMap';
import RiderInfoBox from '../containers/RiderInfoBox';
import LoadingView from '../presentational/LoadingView';
import { selectMapReducer } from '../../slices/mapSlice';
import { selectTripReducer } from '../../slices/tripSlice';
import { useHistory } from 'react-router-dom';

const INIT_POS = {
  lat: 37.8035,
  lng: -122.46,
};

const UPDATE_POS_INTERVAL = 1000;

export default function DriverPickUpForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const alert = Modal.alert;
  const [driverPos, setDriverPos] = useState(INIT_POS);
  const [newDriverPos, setNewDriverPos] = useState(INIT_POS);
  const [riderPos, setRiderPos] = useState({ lat: undefined, lng: undefined });
  const { originPosition }: any = useSelector(selectMapReducer);
  const { trip }: any = useSelector(selectTripReducer);

  useQuery(GET_ORIGIN_POSITION_AND_DESTINATION_POSITION, {
    variables: { id: trip.id },
    onCompleted: ({ trip }) => {
      dispatch(setOriginPosition({ lat: trip.origin.latitude, lng: trip.origin.longitude }));
      dispatch(setDestPosition({ lat: trip.destination.latitude, lng: trip.destination.longitude }));
    },
  });

  const [notifyDriverState] = useMutation(NOTIFY_DRIVER_STATE);

  const { loading, error, data } = useSubscription(
    LISTEN_MATCHED_RIDER_STATE,
    { variables: { tripId: trip.id } },
  );

  const success = (position: Position): any => {
    const pos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };
    setNewDriverPos(pos);
  };

  const navError = (): any => {
    console.log('Error: The Geolocation service failed.');
  };

  const options = {
    enableHighAccuracy: true,
    maximumAge: 0,
  };

  const getDriverPosition = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, navError, options);
    }
  };

  useEffect(() => {
    getDriverPosition();
    let timerId = setTimeout(function tick() {
      if (JSON.stringify(driverPos) !== JSON.stringify(newDriverPos)) {
        setDriverPos(newDriverPos);
      }
      timerId = setTimeout(tick, UPDATE_POS_INTERVAL);
    }, UPDATE_POS_INTERVAL);
    return () => {
      clearTimeout(timerId);
    };
  });

  useEffect(() => {
    notifyDriverState({ variables: { tripId: trip.id, driverPosition: driverPos } });
  }, [driverPos]);

  useEffect(() => {
    if (data && data.matchedRiderState.latitude) {
      setRiderPos({ lat: data.matchedRiderState.latitude, lng: data.matchedRiderState.longitude });
    }
    if (data && data.matchedRiderState.trip.status === 'cancel') {
      alert('호출취소', '라이더가 호출을 취소하였습니다.', [{ text: 'OK', onPress: () => history.push('/driver/main') }]);
    }
  }, [data]);

  if (error) {
    return <p>error</p>;
  }
  if (loading) {
    return <LoadingView message={'라이더의 위치 정보를 기다리는 중입니다.'}/>;
  }

  return (
    <>
      <PickUpMap
        isRider={false}
        riderLat={data.matchedRiderState.latitude}
        riderLng={data.matchedRiderState.longitude}
        driverLat={driverPos.lat}
        driverLng={driverPos.lng}
        pickUpLat={originPosition.lat}
        pickUpLng={originPosition.lng}
      />
      <RiderInfoBox onBoard={false} currentPos={driverPos}/>
    </>
  );
}

