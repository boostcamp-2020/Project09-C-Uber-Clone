import React from 'react';

import styled from 'styled-components';

import { List, WhiteSpace } from 'antd-mobile';

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
  setDriverSignUpCarNumber,
  setDriverSignUpCarType,
  requestDriverSignUp,
} from '../../slice';

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
      <h2>드라이버로 가입하기</h2>
      <List>
        <ProfileImageInput selectable={true} />
        <DiscriptionInput placeholder='한마디' />
        <WhiteSpace />
        <Input
          type='text'
          placeholder='이름(필수)'
          onChange={handleChangeInput(setDriverSignUpName)}
        />
        <Input
          type='phone'
          placeholder='전화번호(필수)'
          onChange={handleChangeInput(setDriverSignUpPhoneNumber)}
        />
        <Input
          type='text'
          placeholder='이메일(필수)'
          onChange={handleChangeInput(setDriverSignUpEmail)}
        />
        <Input
          type='password'
          placeholder='비밀번호(필수)'
          onChange={handleChangeInput(setDriverSignUpPassword)}
        />
        <Input
          type='password'
          placeholder='비밀번호 확인(필수)'
          onChange={handleChangeInput(setDriverSignUpRePassword)}
        />
        <Input
          type='text'
          placeholder='차종(필수)'
          onChange={handleChangeInput(setDriverSignUpCarType)}
        />
        <Input
          type='text'
          placeholder='차량번호(필수)'
          onChange={handleChangeInput(setDriverSignUpCarNumber)}
        />
      </List>
      <SignUpButton
        content={'가입하기'}
        onClick={handleSignUpButton}
      />
    </Form>
  );
}

export default DriverSignUpFrom;
