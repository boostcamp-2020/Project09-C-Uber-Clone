import React, { FunctionComponent } from 'react';


interface LoginInputProps {
  type: string;
  handleChange: any;
}

const LoginInput: FunctionComponent<LoginInputProps> = ({ type, handleChange }) => {
  return (
    <>
      <input type={type} onChange={handleChange} />
    </>
  );
};

export default LoginInput;
