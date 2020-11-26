import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useDispatch } from 'react-redux';

import { useApolloClient } from '@apollo/client';

import { Button, WhiteSpace, Checkbox } from 'antd-mobile';

import styled from 'styled-components';

import Input from '../presentational/Input';

import {
  setLoginEmail,
  setLoginPassword,
  requestLogin,
} from '../../slices/loginSlice';

const Div = styled.div`
  width: 90%;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 250px;

  font-style: normal;
  font-weight: bold;
  font-size: 64px;
  line-height: 77px;

  color: #243443;
`;

const SignupButton = styled.button`
  width:100%;
  margin-top: 5px;
  color: #56A902;
  border: none;
  background-color: transparent;
`;

function LoginForm() {
  const client = useApolloClient();
  const dispatch = useDispatch();

  const [riderCheck, setRiderCheck] = useState(true);
  const [driverCheck, setDriverCheck] = useState(false);

  const handleChangeInput = (setState: any) => (value: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setState(value));
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
    <Div>
      <Header>UBER</Header>
      <Checkbox
        onChange={checkToggle}
        checked={riderCheck}
      >
         라이더
      </Checkbox>
      <Checkbox
        onChange={checkToggle}
        checked={driverCheck}
      >
        드라이버
      </Checkbox>
      <Input
        type='text'
        placeholder='Enter your email'
        onChange={handleChangeInput(setLoginEmail)}
      />
      <WhiteSpace />
      <Input
        type='password'
        placeholder='Enter your password'
        onChange={handleChangeInput(setLoginPassword)}
      />
      <WhiteSpace />
      <Button
        onClick={handleLoginButtonClick}
        type='primary'
        style={{ backgroundColor: '#56A902', marginTop: '100px' }}
      >로그인
      </Button>
      <Link to='/signup/select'>
        <SignupButton>Sign up here</SignupButton>
      </Link>
    </Div>
  );
}

export default LoginForm;
