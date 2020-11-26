import React, { FunctionComponent } from 'react';

import { Button } from 'antd-mobile';

interface SubmitButtonProps {
  content: string;
  onClick: any;
}

const SubmitButton: FunctionComponent<SubmitButtonProps> = ({ content, onClick }) => {
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

export default SubmitButton;
