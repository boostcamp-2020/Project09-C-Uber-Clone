import React from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';

import { WhiteSpace } from 'antd-mobile';

import { useDispatch } from 'react-redux';

import { useApolloClient } from '@apollo/client';

import SignUpButton from '../presentational/SignUpButton';
import Input from '../presentational/Input';

import {
  setRiderSignUpEmail,
  setRiderSignUpName,
  setRiderSignUpPassword,
  setRiderSignUpRePassword,
  setRiderSignUpPhoneNumber,
  requestRiderSignUp,
} from '../../slices/signUpSlice';

const Form = styled.form`
  width: 90%;
  margin-top: 90px;
`;

function RiderSignUpForm() {
  const client = useApolloClient();
  const dispatch = useDispatch();

  const handleChangeInput = (setState: any) => (value: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setState(value));
  };

  const handleSignUpButton = () => {
    dispatch(requestRiderSignUp(client));
  };

  return (
    <Form>
      <Input
        type='text'
        placeholder='이름(필수)'
        onChange={handleChangeInput(setRiderSignUpName)}
      />
      <WhiteSpace />
      <Input
        type='number'
        placeholder='전화번호(필수)'
        onChange={handleChangeInput(setRiderSignUpPhoneNumber)}
      />
      <WhiteSpace />
      <Input
        type='text'
        placeholder='이메일(필수)'
        onChange={handleChangeInput(setRiderSignUpEmail)}
      />
      <WhiteSpace />
      <Input
        type='password'
        placeholder='비밀번호(필수)'
        onChange={handleChangeInput(setRiderSignUpPassword)}
      />
      <WhiteSpace />
      <Input
        type='password'
        placeholder='비밀번호 확인'
        onChange={handleChangeInput(setRiderSignUpRePassword)}
      />
      <WhiteSpace />
      <Link to='/'>
        <SignUpButton
          content={'가입하기'}
          onClick={handleSignUpButton}
        />
      </Link>
    </Form>
  );
}

export default RiderSignUpForm;
