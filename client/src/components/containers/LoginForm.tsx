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

const Header = styled.div`
  display: flex;
  width: 180px;
  height: 117px;
  left: calc(50% - 180px/2 + 6px);
  top: calc(50% - 117px/2 - 191.5px);

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
    <>
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
        style={{ backgroundColor: '#56A902' }}
      >로그인
      </Button>
      <Link to='/signup/select'>
        <button>Sign up here</button>
      </Link>
    </>
  );
}

export default LoginForm;
