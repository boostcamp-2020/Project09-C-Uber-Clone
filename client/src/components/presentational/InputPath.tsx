import React, { FunctionComponent } from 'react';

import styled from 'styled-components';

import { InputItem } from 'antd-mobile';

interface InputProps {
  type: 'number' | 'text' | 'bankCard' | 'phone' | 'password' | 'digit' | 'money';
  placeholder: string;
  value: string;
  onChange: any;
  onClick: any;
}

const CancelButton = styled.button`
  position: absolute;
  right: 10px;
  top: 10px;
  padding: 0 3px;
  background-color: transparent;
  border-radius: 50%;
  border: 0.5px solid #989898;
  color: #989898;
  cursor: pointer;
`;

const InputPath: FunctionComponent<InputProps> = ({ type, placeholder, value, onChange, onClick }) => {

  return (
    <>
      <InputItem
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        style={{ margin: '0 0 0 -90px' }}
      >
        <CancelButton onClick={onClick}>
          X
        </CancelButton>
      </InputItem>
    </>
  );
};

export default InputPath;
