import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { selectPosition, setPosition } from '../../slices/mapSlice';

import { useApolloClient } from '@apollo/client';

import { Button, WhiteSpace, InputItem } from 'antd-mobile';

import styled from 'styled-components';

import Map from '../containers/Map';
import PlaceSearchBox from '../presentational/PlaceSearchBox';

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

  const position = useSelector(selectPosition);
  const [startingPoint, setStartingPoint] = useState('');
  const [destination, setDestination] = useState('');
  const [mapView, setMapView] = useState(false);

  const handleChangeInput = (setState: any) => (value: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setState(value));
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
          dispatch(setPosition(pos));
          setStartingPoint('현재 위치');
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
      <PlaceSearchBox placeholder='출발지' value={startingPoint}/>
      <HereButton onClick={makeStartingPointHere}>현재 위치로</HereButton>
      <WhiteSpace />
      <PlaceSearchBox placeholder='목적지'/>
      <WhiteSpace />
      <Link to='/'>
        <Button
          onClick={handelCourseSubmitButton}
          type='primary'
          style={{ backgroundColor: '#56A902' }}
        >결정
        </Button>
      </Link>
    </>
  );
}

export default SetCourseForm;
