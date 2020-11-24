import React, { FunctionComponent } from 'react';
import { InputItem } from 'antd-mobile';

interface LoginInputProps {
  placeholder: string;
  handleChange: any;
}

import styled from 'styled-components';

const Input = styled.input`
  display: flex;
  width: 319px;
  height: 54px;
  left: 47px;
  top: 337px;
`;

const LoginInput: FunctionComponent<LoginInputProps> = ({ placeholder, handleChange }) => {
  return (
    <>
      <InputItem placeholder={placeholder} onChange={handleChange} />
    </>
  );
};

export default LoginInput;
