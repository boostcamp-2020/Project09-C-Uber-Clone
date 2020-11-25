import React from 'react';

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
  setRiderSignUpPhoneNumber,
  requestRiderSignUp,
} from '../../slice';

const Form = styled.form`
  width: 90%;
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
      <SignUpButton
        content={'가입하기'}
        onClick={handleSignUpButton}
      />
    </Form>
  );
}

export default RiderSignUpForm;
