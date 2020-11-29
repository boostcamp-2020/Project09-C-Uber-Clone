import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import styled from 'styled-components';

import { WhiteSpace } from 'antd-mobile';

import { useApolloClient } from '@apollo/client';

import ProfileImageInput from '../presentational/ProfileImageInput';
import Input from '../presentational/Input';
import DiscriptionInput from '../presentational/DescriptionInput';
import SubmitButton from '../presentational/SubmitButton';

import { requestDriverSignUp } from '../../apis/signUpAPI';

import { checkValidation } from '../../utils/validate';

const Form = styled.form`
  width: 90%;
`;

function DriverSignUpFrom() {
  const client = useApolloClient();
  const history = useHistory();

  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [carType, setCarType] = useState('');
  const [plateNumber, setPlateNumber] = useState('');
  const [isValidate, setIsValidate] = useState(false);

  const handleChangeInput = (setState: any) => (value: React.ChangeEvent<HTMLInputElement>) => {
    setState(value);
  };

  const handleSignUpButton = () => {
    const driverInfo = { name, phoneNumber, email, password, carType, plateNumber };
    requestDriverSignUp(client, history, driverInfo);
  };

  const propertyToCheck = { name, phoneNumber, email, password, rePassword, carType, plateNumber };
  const propertyToWatch = [name, phoneNumber, email, password, rePassword, carType, plateNumber];

  useEffect(() => {
    checkValidation(propertyToCheck, setIsValidate);
  }, propertyToWatch);

  return (
    <Form>
      <ProfileImageInput selectable={true} />
      <DiscriptionInput placeholder='한마디' />
      <WhiteSpace />
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
        placeholder='비밀번호 확인(필수)'
        onChange={handleChangeInput(setRePassword)}
      />
      <WhiteSpace />
      <Input
        type='text'
        placeholder='차종(필수)'
        onChange={handleChangeInput(setCarType)}
      />
      <WhiteSpace />
      <Input
        type='text'
        placeholder='차량번호(필수)'
        onChange={handleChangeInput(setPlateNumber)}
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

export default DriverSignUpFrom;
