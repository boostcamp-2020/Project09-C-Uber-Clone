import React, { FunctionComponent } from 'react';

import { InputItem } from 'antd-mobile';

interface InputProps {
  type: 'number' | 'text' | 'bankCard' | 'phone' | 'password' | 'digit' | 'money';
  placeholder?: string;
  onChange?: any;
  value?: string;
}

const Input: FunctionComponent<InputProps> = ({ type, placeholder, onChange, value }) => {

  return (
    <InputItem
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
    />
  );
};

export default Input;
