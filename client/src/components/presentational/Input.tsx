import React, { FunctionComponent } from 'react';

import { InputItem } from 'antd-mobile';

interface InputProps {
  type: 'number' | 'text' | 'bankCard' | 'phone' | 'password' | 'digit' | 'money';
  placeholder?: string;
  onChange?: any;
}

const Input: FunctionComponent<InputProps> = ({ type, placeholder, onChange }) => {

  return (
    <InputItem
      type={type}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};

export default Input;
