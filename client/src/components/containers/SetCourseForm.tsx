import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { WhiteSpace, Modal } from 'antd-mobile';
import styled from 'styled-components';

import PlaceSearchBox from '../presentational/PlaceSearchBox';
import RiderSetCourseMap from './RiderSetCourseMap';
import CourseSubmitModal from '../presentational/CourseSubmitModal';
import LogoutButton from '../presentational/LogoutButton';
import NoticeModal from '../presentational/NoticeModal';

import { NOTIFY_RIDER_CALL } from '../../queries/callRequest';
import { reverseGoecoding } from '../../utils/geocoding';

import {
  selectMapReducer,
  setOriginPosition,
  setDestPosition,
  setOriginPlace,
  setDestPlace,
  setOriginMarker,
  setDestMarker,
} from '../../slices/mapSlice';
import {
  setTrip,
} from '../../slices/tripSlice';

const HereButton = styled.button`
  background-color: #56A902;
  color: #FFF;
  border: none;
  padding: 4px 12px;
  border-radius: 10px;
  margin: 5px 3.5% 0 3.5%;
  cursor: pointer;
`;

const LogoutPosition = styled.div`
  position: absolute;
  right: 8px;
  top: 12px;
  z-index: 100;
`;

interface TripPlace {
  address: string
  latitude: number
  longitude: number
}

interface NotifyCallVariables {
  origin: TripPlace
  destination: TripPlace
  startTime: string
  distance?: number
  estimatedTime: string
  estimatedDistance: string
}

function SetCourseForm() {
  const history = useHistory();
  const dispatch = useDispatch();

  const [notifyCall, { data }] = useMutation(NOTIFY_RIDER_CALL);

  const {
    originPlace,
    destPlace,
    originPosition,
    destPosition,
  }: any = useSelector(selectMapReducer);
  const [riderPos, setRiderPos] = useState({ lat: undefined, lng: undefined });
  const [originAutocomplete, setOriginAutocomplete] = useState(null);
  const [destAutocomplete, setDestAutocomplete] = useState(null);
  const [originInput, setOriginInput] = useState('');
  const [destInput, setDestInput] = useState('');
  const [originInputError, setOriginInputError] = useState(false);
  const [destInputError, setDestInputError] = useState(false);
  const [estimatedTime, setEstimatedTime] = useState('');
  const [estimatedDistance, setEstimatedDistance] = useState('');

  const handleClickCancel = (setPlace: any, setMarker: any) => (value: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setPlace(''));
    dispatch(setMarker(''));
  };

  const handelCourseSubmitButton = () => {
    if (originPlace === '') {
      setOriginInputError(true);
      return;
    }
    if (destPlace === '') {
      setDestInputError(true);
      return;
    }
    const variables: NotifyCallVariables = {
      origin: { address: originPlace, latitude: originPosition.lat, longitude: originPosition.lng },
      destination: { address: destPlace, latitude: destPosition.lat, longitude: destPosition.lng },
      startTime: (new Date()).toString(),
      distance: 0.03,
      estimatedTime,
      estimatedDistance,
    };
    notifyCall({ variables });
    dispatch(setOriginPlace(''));
    dispatch(setOriginMarker(''));
    dispatch(setDestPlace(''));
    dispatch(setDestMarker(''));
  };

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

  const getCurrentRiderPos = () => {
    if (navigator.geolocation) {
      return navigator.geolocation.watchPosition(success, navError, options);
    }
  };

  const makeStartingPointHere = async() => {
    dispatch(setOriginMarker(''));
    dispatch(setOriginPosition(riderPos));
    const address = await reverseGoecoding(riderPos);
    dispatch(setOriginPlace(address));
    dispatch(setOriginMarker('현재위치'));
  };

  const onOrignAutocompleteLoad = (autocomplete: any) => {
    setOriginAutocomplete(autocomplete);
  };

  const onOriginAutocompletePlaceChanged = () => {
    if (originAutocomplete !== null) {
      const lat = originAutocomplete.getPlace().geometry.location.lat();
      const lng = originAutocomplete.getPlace().geometry.location.lng();
      dispatch(setOriginPlace(originAutocomplete.getPlace().name));
      dispatch(setOriginPosition({ lat, lng }));
      dispatch(setOriginMarker(originAutocomplete.getPlace().name));
      setOriginAutocomplete(originAutocomplete);
    }
  };

  const destAutocompleteLoad = (autocomplete: any) => {
    setDestAutocomplete(autocomplete);
  };

  const onDestAutocompletePlaceChanged = () => {
    if (destAutocomplete !== null) {
      const lat = destAutocomplete.getPlace().geometry.location.lat();
      const lng = destAutocomplete.getPlace().geometry.location.lng();
      dispatch(setDestPlace(destAutocomplete.getPlace().name));
      dispatch(setDestPosition({ lat, lng }));
      dispatch(setDestMarker(destAutocomplete.getPlace().name));
      setDestAutocomplete(destAutocomplete);
    }
  };

  const handleOnChangeOrigin = (event: any) => {
    setOriginInput(event.target.value);
  };

  const handleOnChangeDest = (event: any) => {
    setDestInput(event.target.value);
  };

  const logoutButtonHandler = () => {
    Modal.alert(
      '로그아웃',
      '',
      [
        { text: 'Cancel' },
        { text: 'Ok', onPress: logout },
      ]);
  };

  const logout = () => {
    localStorage.removeItem('token');
    history.push('/login');
  };

  useEffect(() => {
    setOriginInput(originPlace);
    setOriginInputError(false);
  }, [originPlace]);

  useEffect(() => {
    setDestInput(destPlace);
    setDestInputError(false);
  }, [destPlace]);

  useEffect(() => {
    if (data) {
      dispatch(setTrip({ id: data.driverCall }));
      history.push('/rider/waiting');
    }
  }, [data]);

  useEffect(() => {
    const locationWatch = getCurrentRiderPos();
    return () =>
      navigator.geolocation.clearWatch(locationWatch);
  }, []);

  return (
    <>
      <NoticeModal lat={riderPos.lat} lng={riderPos.lng}/>
      <LogoutPosition>
        <LogoutButton
          width='20px'
          height='20px'
          color='rgba(0, 0, 0, 0.54)'
          background='white'
          onClick={logoutButtonHandler}
        />
      </LogoutPosition>
      <RiderSetCourseMap
        setEstimatedDistance={setEstimatedDistance}
        setEstimatedTime={setEstimatedTime}
        originPlace={originPlace}
        destPlace={destPlace}
        originPosition={originPosition}
        destPosition={destPosition}
      />
      <WhiteSpace />
      <HereButton onClick={makeStartingPointHere}>현재 위치로</HereButton>
      <WhiteSpace />
      <PlaceSearchBox
        placeholder='출발지'
        onLoad={onOrignAutocompleteLoad}
        onPlaceChanged={onOriginAutocompletePlaceChanged}
        onCancelClicked={handleClickCancel(setOriginPlace, setOriginMarker)}
        value={originInput}
        onChange={handleOnChangeOrigin}
        error={originInputError}
      />
      <WhiteSpace />
      <PlaceSearchBox
        placeholder='도착지'
        onLoad={destAutocompleteLoad}
        onPlaceChanged={onDestAutocompletePlaceChanged}
        onCancelClicked={handleClickCancel(setDestPlace, setDestMarker)}
        value={destInput}
        onChange={handleOnChangeDest}
        error={destInputError}
      />
      <WhiteSpace />
      <CourseSubmitModal
        time={estimatedTime}
        distance={estimatedDistance}
        onClick={handelCourseSubmitButton}
        disabled={!originPlace || !destPlace}
      />
    </>
  );
}

export default SetCourseForm;
