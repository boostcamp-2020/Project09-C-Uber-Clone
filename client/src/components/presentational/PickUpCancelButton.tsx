import React, { FunctionComponent } from 'react';

import styled from 'styled-components';

interface CancelButtonProps {
  content: string;
  onClick: any;
}

const Button = styled.button`
  position: absolute;
  top: 2%;
  right: 3%;
  width: 100px;
  height: 40px;
  padding: 10px 12px;
  border: none;
  border-radius: 5px;
  background-color: rgba(117, 215, 1, 0.6);
  z-index: 10;
  text-align: center;
  font-size: 16px;
  color: #ffffff;
`;

const PickUpCancelButton: FunctionComponent<CancelButtonProps> = ({ content, onClick }) => {
  return (
    <Button
      onClick={onClick}
    >
      {content}
    </Button>
  );
};

export default PickUpCancelButton;
