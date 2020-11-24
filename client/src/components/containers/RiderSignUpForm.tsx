import React from 'react';

import styled from 'styled-components';

import { WhiteSpace } from 'antd-mobile';

import SignUpButton from '../presentational/SignUpButton';
import Input from '../presentational/Input';

const Form = styled.form`
  width: 90%;
`;

function RiderSignUpForm() {
  return (
    <Form>
      <Input type='text' placeholder='이름(필수)' />
      <WhiteSpace />
      <Input type='phone' placeholder='전화번호(필수)' />
      <WhiteSpace />
      <Input type='text' placeholder='이메일(필수)' />
      <WhiteSpace />
      <Input type='password' placeholder='비밀번호(필수)' />
      <WhiteSpace />
      <Input type='password' placeholder='비밀번호 확인(필수)' />
      <WhiteSpace />
      <SignUpButton content={'가입하기'}/>
    </Form>
  );
}

export default RiderSignUpForm;
