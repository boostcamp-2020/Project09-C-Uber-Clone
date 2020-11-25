import React, { FunctionComponent } from 'react';
import { InputItem } from 'antd-mobile';

interface LoginInputProps {
  placeholder: string;
  handleChange: any;
}

const LoginInput: FunctionComponent<LoginInputProps> = ({ placeholder, handleChange }) => {
  return (
    <>
      <InputItem placeholder={placeholder} onChange={handleChange} />
    </>
  );
};

export default LoginInput;
