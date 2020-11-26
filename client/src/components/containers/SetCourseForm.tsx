import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useDispatch } from 'react-redux';

import { useApolloClient } from '@apollo/client';

import { Button, WhiteSpace } from 'antd-mobile';

import styled from 'styled-components';

import Input from '../presentational/Input';

const Header = styled.div`
  height: 266px;
  left: 0px;
  top: 0px;

  background: #56A902;
`;

const PageTitle = styled.div`
  left: 30px;
  top: 44px;

  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 48px;
  line-height: 56px;

  color: #F8F8FF;
`;

const FormTitle = styled.div`
  width: 85px;
  height: 27px;
  left: 24px;
  top: 298px;

  font-family: Inter;
  font-style: normal;
  font-weight: bold;
  font-size: 22px;
  line-height: 27px;
  /* identical to box height */

  letter-spacing: -0.02em;

  /* 9 black */

  color: #000000;
`;

function SetCourseForm() {
  const client = useApolloClient();
  const dispatch = useDispatch();

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
    //TODO: 현재위치 받아서, text로 바꿔서 출발지에 넣어주기
    console.log('here');
  };

  const showMapView = () => {
    //TODO: 출발지나 도착지를 dropdown list를 통하여 확정하면 세부 설정 할 수 있도록 setMapView(true)
  };


  return (
    <>
      <Header>
        <PageTitle>라이더 경로설정</PageTitle>
      </Header>
      <FormTitle>경로 선택</FormTitle>
      <Input
        type='text'
        placeholder='출발지'
        onChange={handleChangeInput(setStartingPoint)}
      />
      <button onClick={makeStartingPointHere}>현재 위치로</button>
      <WhiteSpace />
      <Input
        type='text'
        placeholder='목적지'
        onChange={handleChangeInput(setDestination)}
      />
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
