import React, {FunctionComponent} from 'react';

interface LoginInputProps {
  type: string;
}

const LoginInput: FunctionComponent<LoginInputProps> = ({ type }) => {
  return (
    <input type={type}>
    </input>
  );
}

export default LoginInput;