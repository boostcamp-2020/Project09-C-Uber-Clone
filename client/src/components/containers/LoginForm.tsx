import React from 'react';

import LoginInput from '../presentational/LoginInput';

import { useDispatch } from 'react-redux';

import { setLoginIdInput, setLoginPasswordInput, getHello } from '../../slice';

import { useQuery } from '@apollo/client';

import { helloQuery } from '../../queries/hello';

function LoginForm() {
  const { loading, data, error } = useQuery(
    helloQuery,
    {
      fetchPolicy: 'cache-and-network',
      nextFetchPolicy: 'cache-first',
    },
  );

  const dispatch = useDispatch();

  const handleChangeId = async (e: any) => {
    dispatch(setLoginIdInput(e.target.value));
    dispatch(getHello());
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
