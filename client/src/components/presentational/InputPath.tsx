import React, { FunctionComponent } from 'react';

import { InputItem } from 'antd-mobile';

interface InputProps {
  type: 'number' | 'text' | 'bankCard' | 'phone' | 'password' | 'digit' | 'money';
  placeholder: string;
  value: string;
  onChange: any;
}

const InputPath: FunctionComponent<InputProps> = ({ type, placeholder, value, onChange }) => {

  return (
    <InputItem
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};

export default InputPath;
