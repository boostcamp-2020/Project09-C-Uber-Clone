import React from 'react';

import styled from 'styled-components';

import { WhiteSpace } from 'antd-mobile';

import { useDispatch } from 'react-redux';

import { useApolloClient } from '@apollo/client';

import ProfileImageInput from '../presentational/ProfileImageInput';
import Input from '../presentational/Input';
import DiscriptionInput from '../presentational/DescriptionInput';
import SignUpButton from '../presentational/SignUpButton';

import {
  setDriverSignUpName,
  setDriverSignUpPhoneNumber,
  setDriverSignUpEmail,
  setDriverSignUpPassword,
  setDriverSignUpRePassword,
  setDriverSignUpPlateNumber,
  setDriverSignUpCarType,
  requestDriverSignUp,
} from '../../slices/signUpSlice';

const Form = styled.form`
  width: 90%;
`;

function DriverSignUpFrom() {
  const client = useApolloClient();
  const dispatch = useDispatch();

  const handleChangeInput = (setState: any) => (value: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setState(value));
  };

  const handleSignUpButton = () => {
    dispatch(requestDriverSignUp(client));
  };

  return (
    <Form>
      <ProfileImageInput selectable={true} />
      <DiscriptionInput placeholder='한마디' />
      <WhiteSpace />
      <Input
        type='text'
        placeholder='이름(필수)'
        onChange={handleChangeInput(setDriverSignUpName)}
      />
      <WhiteSpace />
      <Input
        type='phone'
        placeholder='전화번호(필수)'
        onChange={handleChangeInput(setDriverSignUpPhoneNumber)}
      />
      <WhiteSpace />
      <Input
        type='text'
        placeholder='이메일(필수)'
        onChange={handleChangeInput(setDriverSignUpEmail)}
      />
      <WhiteSpace />
      <Input
        type='password'
        placeholder='비밀번호(필수)'
        onChange={handleChangeInput(setDriverSignUpPassword)}
      />
      <WhiteSpace />
      <Input
        type='password'
        placeholder='비밀번호 확인(필수)'
        onChange={handleChangeInput(setDriverSignUpRePassword)}
      />
      <WhiteSpace />
      <Input
        type='text'
        placeholder='차종(필수)'
        onChange={handleChangeInput(setDriverSignUpCarType)}
      />
      <WhiteSpace />
      <Input
        type='text'
        placeholder='차량번호(필수)'
        onChange={handleChangeInput(setDriverSignUpPlateNumber)}
      />
      <WhiteSpace />
      <SignUpButton
        content={'가입하기'}
        onClick={handleSignUpButton}
      />
    </Form>
  );
}

export default DriverSignUpFrom;
