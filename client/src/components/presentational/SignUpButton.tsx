import React, { FunctionComponent } from 'react';

import { Button } from 'antd-mobile';

interface SignUpButtonProps {
  content: string;
}

const LoginInput: FunctionComponent<SignUpButtonProps> = ({ content }) => {
  return (
    <Button type='primary' style={{ backgroundColor: '#56A902' }}>{content}</Button>
  );
};

export default LoginInput;
