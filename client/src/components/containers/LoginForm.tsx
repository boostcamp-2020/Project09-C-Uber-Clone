import React from 'react';

import LoginInput from '../presentational/LoginInput';

function LoginForm() {
  return (
    <>
      <LoginInput type="text" />
      <LoginInput type="password" />
    </>
  );
}

export default LoginForm;