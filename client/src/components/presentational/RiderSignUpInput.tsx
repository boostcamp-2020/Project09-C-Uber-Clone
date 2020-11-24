import React, { FunctionComponent } from 'react';

import { InputItem } from 'antd-mobile';

interface RiderSignUpInput {
  placeholder: string;
}

const LoginInput: FunctionComponent<RiderSignUpInput> = ({ placeholder }) => {
  return (
    <InputItem placeholder={placeholder}/>
  );
};

export default LoginInput;
