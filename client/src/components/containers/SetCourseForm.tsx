import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useApolloClient, useSubscription } from '@apollo/client';

import { WhiteSpace } from 'antd-mobile';
import styled from 'styled-components';

import { callRequest } from '../../apis/callRequestAPI';
import PlaceSearchBox from '../presentational/PlaceSearchBox';
import RiderSetCourseMap from './RiderSetCourseMap';
import SubmitButton from '../presentational/SubmitButton';
import { driverResponded } from '../../queries/driverResponded';

import {
  selectMapReducer,
  setOriginPosition,
  setDestPosition,
  setOriginPlace,
  setDestPlace,
  setOriginMarker,
  setDestMarker,
} from '../../slices/mapSlice';

const Header = styled.div`
  height: 130px;
  padding:10px;

  background: #56A902;
`;

const PageTitle = styled.div`
  left: 30px;
  top: 44px;

  font-style: normal;
  font-weight: normal;
  font-size: 48px;
  line-height: 56px;

  color: #F8F8FF;
`;

const FormTitle = styled.div`
  padding:8px;

  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 27px;
  /* identical to box height */

  letter-spacing: -0.02em;

  /* 9 black */
  color: #000000;
`;

const HereButton = styled.button`
  background-color: transparent;
  color: #56A902;
  border: none;
  margin-top: 5px;
  margin-left: 10px;
  cursor: pointer;
`;

function SetCourseForm() {
  const client = useApolloClient();
  const dispatch = useDispatch();

  const [skip, setSkip] = useState(true);
  useSubscription(driverResponded, { skip, onSubscriptionData: ({ subscriptionData: { data } }) => {
    console.log(data);
    //TODO: data의 response메시지가 success이면 skip:true로 변경 후 다음 화면
  } });

  const { originPlace, destPlace }: any = useSelector(selectMapReducer);
  const { originPosition, destPosition } : any = useSelector(selectMapReducer);
  const [originAutocomplete, setOriginAutocomplete] = useState(null);
  const [destAutocomplete, setDestAutocomplete] = useState(null);
  const [originInput, setOriginInput] = useState('');
  const [destInput, setDestInput] = useState('');

  const handleClickCancel = (setPlace: any, setPosition: any, setMarker: any) => (value: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setPlace(''));
    dispatch(setPosition({ lat: 0, lng: 0 }));
    dispatch(setMarker(''));
  };
  const driverIds = ['5fc4aab0aa5f0a79191c2bd5', '2', '3'];
  const handelCourseSubmitButton = () => {
    callRequest(client, driverIds, 'riderId', originPosition, destPosition);
    setSkip(false);
  };

  const makeStartingPointHere = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: Position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          dispatch(setOriginPosition(pos));
          dispatch(setOriginPlace('현재위치'));
          dispatch(setOriginMarker('현재위치'));
        },
        () => {
          console.log('Error: The Geolocation service failed.');
        },
      );
    } else {
      console.log('Error: Your browser doesn\'t support geolocation');
    }
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

  useEffect(() => {
    setOriginInput(originPlace);
  }, [originPlace]);

  useEffect(() => {
    setDestInput(destPlace);
  }, [destPlace]);

  return (
    <>
      <Header>
        <PageTitle>라이더 <br/> 경로설정</PageTitle>
      </Header>
      <RiderSetCourseMap />
      <FormTitle>경로 선택</FormTitle>
      <PlaceSearchBox
        placeholder='출발지'
        onLoad={onOrignAutocompleteLoad}
        onPlaceChanged={onOriginAutocompletePlaceChanged}
        onCancelClicked={handleClickCancel(setOriginPlace, setOriginPosition, setOriginMarker)}
        value={originInput}
        onChange={handleOnChangeOrigin}
      />
      <HereButton onClick={makeStartingPointHere}>현재 위치로</HereButton>
      <WhiteSpace />
      <PlaceSearchBox
        placeholder='도착지'
        onLoad={destAutocompleteLoad}
        onPlaceChanged={onDestAutocompletePlaceChanged}
        onCancelClicked={handleClickCancel(setDestPlace, setDestPosition, setDestMarker)}
        value={destInput}
        onChange={handleOnChangeDest}
      />
      <WhiteSpace />
      <SubmitButton
        content={'결정'}
        onClick={handelCourseSubmitButton}
        disabled={false}
      />
    </>
  );
}

export default SetCourseForm;
