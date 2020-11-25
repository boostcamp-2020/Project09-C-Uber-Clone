import React, { useState } from 'react';

import { setLoginEmail, setLoginPassword, requestLogin } from '../../slice';

import { useDispatch } from 'react-redux';
import { useApolloClient } from '@apollo/client';

import { Button, WhiteSpace, Checkbox, InputItem } from 'antd-mobile';

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
  const handleLoginButtonClick = () => {
    dispatch(requestLogin(client, riderCheck));
  };

  const checkToggle = (e: any) => {
    if (e.target.children === '라이더' && !riderCheck) {
      setRiderCheck(true);
      setDriverCheck(false);
    }
    if (e.target.children === '드라이버' && !driverCheck) {
      setRiderCheck(false);
      setDriverCheck(true);
    }
  };

  return (
    <>
      <Header>UBER</Header>
      <Checkbox onChange={checkToggle} checked={riderCheck}>라이더</Checkbox>
      <Checkbox onChange={checkToggle} checked={driverCheck}>드라이버</Checkbox>
      <InputItem placeholder="Enter your email" onChange={handleChangeEmail} />
      <WhiteSpace />
      <InputItem placeholder="Enter your password" onChange={handleChangePassword}/>
      <WhiteSpace />
      <Button
        onClick={handleLoginButtonClick}
        type='primary'
        style={{ backgroundColor: '#56A902' }}>로그인</Button>
    </>
  );
}

export default LoginForm;
