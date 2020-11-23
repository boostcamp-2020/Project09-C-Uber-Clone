import React from 'react';

import LoginInput from '../presentational/LoginInput';

import { useDispatch } from 'react-redux';

import { setLoginIdInput, setLoginPasswordInput, getHello } from '../../slice';

import { useApolloClient } from '@apollo/client';

function LoginForm() {
  const client = useApolloClient();
  const dispatch = useDispatch();

  const handleChangeId = async (e: any) => {
    dispatch(setLoginIdInput(e.target.value));
    dispatch(getHello(client));
  };

  const handleChangePassword = (e: any) => {
    dispatch(setLoginPasswordInput(e.target.value));
  };

  return (
    <>
      <LoginInput type="text" handleChange={handleChangeId} />
      <LoginInput type="password" handleChange={handleChangePassword}/>
    </>
  );
}

export default LoginForm;
