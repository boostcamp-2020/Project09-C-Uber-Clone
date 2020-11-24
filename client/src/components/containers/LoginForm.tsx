import React, { useState } from 'react';

import LoginInput from '../presentational/LoginInput';

import { setLoginEmail, setLoginPassword, requestLogin } from '../../slice';

import { useDispatch } from 'react-redux';
import { useApolloClient } from '@apollo/client';
import { Button, WhiteSpace, Checkbox } from 'antd-mobile';

import styled from 'styled-components';

const Header = styled.div`
display: flex;
width: 180px;
height: 117px;
left: calc(50% - 180px/2 + 6px);
top: calc(50% - 117px/2 - 191.5px);

font-family: Inter;
font-style: normal;
font-weight: bold;
font-size: 64px;
line-height: 77px;

color: #243443;
`;

function LoginForm() {
  const client = useApolloClient();
  const dispatch = useDispatch();

  const [riderCheck, setRiderCheck] = useState(true);
  const [driverCheck, setDriverCheck] = useState(false);

  const handleChangeEmail = async (e: any) => {
    dispatch(setLoginEmail(e.target.value));
  };
  const handleChangePassword = (e: any) => {
    dispatch(setLoginPassword(e.target.value));
  };

  const loginButton = () => {
    requestLogin(client, riderCheck);
  };

  const onRiderCheck = (e : any) => {
    if (!riderCheck) {
      setRiderCheck(true);
      setDriverCheck(false);
    }
  };
  const onDriverCheck = (e: any) => {
    if (!driverCheck) {
      setRiderCheck(false);
      setDriverCheck(true);
    }
  };

  return (
    <>
      <Header>UBER</Header>
      <Checkbox onChange={onRiderCheck} checked={riderCheck}>라이더</Checkbox>
      <Checkbox onChange={onDriverCheck} checked={driverCheck}>드라이버</Checkbox>
      <LoginInput placeholder="Enter your email" handleChange={handleChangeEmail} />
      <WhiteSpace />
      <LoginInput placeholder="Enter your password" handleChange={handleChangePassword}/>
      <WhiteSpace />
      <Button onClick={loginButton} type='primary' style={{ backgroundColor: '#56A902' }}>로그인</Button>
    </>
  );
}

export default LoginForm;
