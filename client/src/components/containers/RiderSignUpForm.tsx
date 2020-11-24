import React from 'react';

import styled from 'styled-components';

import { WhiteSpace } from 'antd-mobile';

import SignUpButton from '../presentational/SignUpButton';
import RiderSignUpInput from '../presentational/RiderSignUpInput';

const Form = styled.form`
  width: 90%;
`;

function RiderSignUpForm() {
  return (
    <Form>
      <RiderSignUpInput placeholder="이름(필수)"/>
      <WhiteSpace />
      <RiderSignUpInput placeholder="전화번호(필수)"/>
      <WhiteSpace />
      <RiderSignUpInput placeholder="이메일(필수)"/>
      <WhiteSpace />
      <RiderSignUpInput placeholder="비밀번호(필수)"/>
      <WhiteSpace />
      <RiderSignUpInput placeholder="비밀번호 확인(필수)"/>
      <WhiteSpace />
      <SignUpButton content={'가입하기'}/>
    </Form>
  );
}

export default RiderSignUpForm;
