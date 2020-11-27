import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import { useApolloClient } from '@apollo/client';

import { WhiteSpace } from 'antd-mobile';

import styled from 'styled-components';

import InputPath from '../presentational/InputPath';
import Map from '../containers/Map';
import SubmitButton from '../presentational/SubmitButton';

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
  padding:10px;

  font-style: normal;
  font-weight: bold;
  font-size: 22px;
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
  const { originPlace, destPlace }: any = useSelector(selectMapReducer);

  const [mapView, setMapView] = useState(false);

  const handleChangeInput = (setState: any) => (value: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setState(value));
  };

  const handleClickCancel = (setPlace: any, setPosition: any, setMarker: any) => (value: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setPlace(''));
    dispatch(setPosition({ lat: 0, lng: 0 }));
    dispatch(setMarker(''));
  };

  const handelCourseSubmitButton = () => {
    // TODO: dispatch(sendCourse(client, { startingPoint, destination }));
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
          dispatch(setOriginMarker('check'));
        },
        () => {
          console.log('Error: The Geolocation service failed.');
        },
      );
    } else {
      console.log('Error: Your browser doesn\'t support geolocation');
    }
  };

  const showMapView = () => {
    //TODO: 출발지나 도착지를 dropdown list를 통하여 확정하면 세부 설정 할 수 있도록 setMapView(true)
  };

  return (
    <>
      <Header>
        <PageTitle>라이더 <br/> 경로설정</PageTitle>
      </Header>
      <Map />
      <FormTitle>경로 선택</FormTitle>
      <InputPath
        type='text'
        placeholder='출발지'
        value={originPlace}
        onChange={handleChangeInput(setOriginPlace)}
        onClick={handleClickCancel(
          setOriginPlace,
          setOriginPosition,
          setOriginMarker,
        )}
      />
      <HereButton onClick={makeStartingPointHere}>현재 위치로</HereButton>
      <WhiteSpace />
      <InputPath
        type='text'
        placeholder='목적지'
        value={destPlace}
        onChange={handleChangeInput(setDestPlace)}
        onClick={handleClickCancel(
          setDestPlace,
          setDestPosition,
          setDestMarker,
        )}
      />
      <WhiteSpace />
      <Link to='/'>
        <SubmitButton
          content={'결정'}
          onClick={handelCourseSubmitButton}
        />
      </Link>
    </>
  );
}

export default SetCourseForm;
