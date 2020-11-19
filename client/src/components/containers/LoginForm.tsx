import React from 'react';

import LoginInput from '../presentational/LoginInput';

import { useDispatch } from 'react-redux';

import { setLoginIdInput, setLoginPasswordInput } from '../../slice'

function LoginForm() {
  const dispatch = useDispatch();

  const handleChangeId = (e: any) => {
    dispatch(setLoginIdInput(e.target.value)); 
  }

  const handleChangePassword = (e: any) => {
    dispatch(setLoginPasswordInput(e.target.value)); 
  }

  return (
    <>
      <LoginInput type="text" handleChange={handleChangeId} />
      <LoginInput type="password"  handleChange={handleChangePassword}/>
    </>
  );
}

export default LoginForm;