import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import styled from 'styled-components';

import { WhiteSpace } from 'antd-mobile';

import { useMutation } from '@apollo/client';

import SubmitButton from '../presentational/SubmitButton';
import Input from '../presentational/Input';

import { SIGNUP_RIDER } from '../../queries/signup';

import { checkValidation } from '../../utils/validate';

const Form = styled.form`
  width: 90%;
  margin-top: 90px;
`;

function RiderSignUpForm() {
  const [signUpRider] = useMutation(SIGNUP_RIDER);
  const history = useHistory();

  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [isValidate, setIsValidate] = useState(false);

  const handleChangeInput = (setState: any) => (value: React.ChangeEvent<HTMLInputElement>) => {
    setState(value);
  };

  const handleSignUpButton = async () => {
    const riderInfo = { name, phoneNumber, email, password };
    try {
      await signUpRider({ variables: riderInfo });
      window.alert('회원가입 성공');
      history.push('/login');
    } catch (error) {
      window.alert(`회원가입 실패\n원인${error}`);
    }
  };

  const propertyToCheck = { name, phoneNumber, email, password, rePassword };
  const propertyToWatch = [name, phoneNumber, email, password, rePassword];

  useEffect(() => {
    checkValidation(propertyToCheck, setIsValidate);
  }, propertyToWatch);

  return (
    <Form>
      <Input
        type='text'
        placeholder='이름(필수)'
        onChange={handleChangeInput(setName)}
      />
      <WhiteSpace />
      <Input
        type='phone'
        placeholder='전화번호(필수)'
        onChange={handleChangeInput(setPhoneNumber)}
      />
      <WhiteSpace />
      <Input
        type='text'
        placeholder='이메일(필수)'
        onChange={handleChangeInput(setEmail)}
      />
      <WhiteSpace />
      <Input
        type='password'
        placeholder='비밀번호(필수)'
        onChange={handleChangeInput(setPassword)}
      />
      <WhiteSpace />
      <Input
        type='password'
        placeholder='비밀번호 확인'
        onChange={handleChangeInput(setRePassword)}
      />
      <WhiteSpace />
      <SubmitButton
        content={'가입하기'}
        onClick={handleSignUpButton}
        disabled={!isValidate}
      />
    </Form>
  );
}

export default RiderSignUpForm;
