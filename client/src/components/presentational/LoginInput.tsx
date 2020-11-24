import React, { FunctionComponent } from 'react';

import { Button } from 'antd-mobile';

interface LoginInputProps {
  type: string;
  handleChange: any;
}

const LoginInput: FunctionComponent<LoginInputProps> = ({ type, handleChange }) => {
  return (
    <>
      <input type={type} onChange={handleChange} />
      <Button>확인</Button>
    </>
  );
};

export default LoginInput;
