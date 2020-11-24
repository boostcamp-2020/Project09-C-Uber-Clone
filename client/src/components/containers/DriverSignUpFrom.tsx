import React from 'react';

import { List } from 'antd-mobile';

import ProfileImageInput from '../presentational/ProfileImageInput';
import Input from '../presentational/Input';
import DiscriptionInput from '../presentational/DescriptionInput';

function DriverSignUpFrom() {
  return (
    <>
      <h2>드라이버로 가입하기</h2>
      <List>
        <ProfileImageInput selectable={true} />
        <DiscriptionInput placeholder='한마디' />
        <Input type='text' placeholder='이름(필수)'></Input>
        <Input type='phone' placeholder='전화번호(필수)'></Input>
        <Input type='text' placeholder='이메일(필수)'></Input>
        <Input type='password' placeholder='비밀번호(필수)'></Input>
        <Input type='password' placeholder='비밀번호 확인(필수)'></ Input>
        <Input type='text' placeholder='차종(필수)'></Input>
        <Input type='text' placeholder='차량번호(필수)'></Input>
      </List>
    </>
  );
}

export default DriverSignUpFrom;
