import React, { FunctionComponent } from 'react';

import { Button } from 'antd-mobile';

interface SubmitButtonProps {
  content: string;
  onClick: any;
  disabled: boolean;
}

const SubmitButton: FunctionComponent<SubmitButtonProps> = ({ content, onClick, disabled }) => {
  return (
    <Button
      type='primary'
      style={{ backgroundColor: '#56A902' }}
      onClick={onClick}
      disabled={disabled}
    >
      {content}
    </Button>
  );
};

export default SubmitButton;
