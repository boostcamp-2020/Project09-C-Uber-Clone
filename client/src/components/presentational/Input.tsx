import React, { FunctionComponent } from 'react';

import { InputItem } from 'antd-mobile';

interface InputProps {
  type: 'number' | 'text' | 'bankCard' | 'phone' | 'password' | 'digit' | 'money';
  placeholder: string;
}

const Input: FunctionComponent<InputProps> = ({ type, placeholder }) => {
  return (
    <InputItem type={type} placeholder={placeholder} />
  );
};

export default Input;
