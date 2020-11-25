import React, { FunctionComponent } from 'react';

import { Button } from 'antd-mobile';

interface SignUpButtonProps {
  content: string;
  onClick: any;
}

const SignUpButton: FunctionComponent<SignUpButtonProps> = ({ content, onClick }) => {
  return (
    <Button
      type='primary'
      style={{ backgroundColor: '#56A902' }}
      onClick={onClick}
    >
      {content}
    </Button>
  );
};

export default SignUpButton;
