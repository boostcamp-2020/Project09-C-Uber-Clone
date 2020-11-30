import React, { FunctionComponent } from 'react';

import { Button } from 'antd-mobile';

interface IgnoreButtonProps {
  content: string;
  onClick?: any;
}

const IgnoreButton: FunctionComponent<IgnoreButtonProps> = ({ content, onClick }) => {
  return (
    <Button
      style={{ backgroundColor: '#858585', color: 'white' }}
      onClick={onClick}
    >
      {content}
    </Button>
  );
};

export default IgnoreButton;
