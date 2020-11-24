import React from 'react';
import React, { useState } from 'react';

import LoginInput from '../presentational/LoginInput';

import { setLoginEmail, setLoginPassword, requestLogin } from '../../slice';

import { useDispatch } from 'react-redux';
import { useApolloClient } from '@apollo/client';
import { Button } from 'antd-mobile';

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
    requestLogin(client);
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
      <LoginInput type="text" handleChange={handleChangeEmail} />
      <LoginInput type="password" handleChange={handleChangePassword}/>
      <Button onClick={loginButton}>로그인</Button>
      <Checkbox onChange={onRiderCheck} checked={riderCheck}>라이더</Checkbox>
      <Checkbox onChange={onDriverCheck} checked={driverCheck}>드라이버</Checkbox>
    </>
  );
}

export default LoginForm;
