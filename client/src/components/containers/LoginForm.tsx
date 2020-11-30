import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { useApolloClient } from '@apollo/client';

import { WhiteSpace, Checkbox } from 'antd-mobile';

import styled from 'styled-components';

import Input from '../presentational/Input';

import { requestLogin } from '../../apis/loginAPI';

import { checkValidation } from '../../utils/validate';

import SubmitButton from '../presentational/SubmitButton';

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
  const history = useHistory();

  const [riderCheck, setRiderCheck] = useState(true);
  const [driverCheck, setDriverCheck] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isValidate, setIsValidate] = useState(false);

  const handleChangeInput = (setState: any) => (value: React.ChangeEvent<HTMLInputElement>) => {
    setState(value);
  };

  const handleLoginButtonClick = () => {
    requestLogin(client, history, riderCheck, email, password);
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

  const propertyToCheck = { email, password };
  const propertyToWatch = [email, password];

  useEffect(() => {
    checkValidation(propertyToCheck, setIsValidate);
  }, propertyToWatch);

  return (
    <Div>
      <Header>UBER</Header>
      <Checkbox
        onChange={checkToggle}
        checked={riderCheck}
        style={{ margin: '0 10px 10px 0' }}
      >
         라이더
      </Checkbox>
      <Checkbox
        onChange={checkToggle}
        checked={driverCheck}
        style={{ margin: '0 0 10px 10px' }}
      >
        드라이버
      </Checkbox>
      <WhiteSpace />
      <Input
        type='text'
        placeholder='Enter your email'
        onChange={handleChangeInput(setEmail)}
      />
      <WhiteSpace />
      <Input
        type='password'
        placeholder='Enter your password'
        onChange={handleChangeInput(setPassword)}
      />
      <WhiteSpace />
      <SubmitButton
        content={'로그인'}
        onClick={handleLoginButtonClick}
        disabled={!isValidate}
      />
      <Link to='/signup/select'>
        <SignupButton>Sign up here</SignupButton>
      </Link>
    </Div>
  );
}

export default LoginForm;
