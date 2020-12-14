import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

const Button = styled.button<{online: boolean}>`
  position: absolute;
  bottom: 16px;
  left: 0;
  right: 0;
  width: 60px;
  height: 60px;
  margin: auto;
  padding: 4px;
  border: none;
  border-radius: 50%;
  background-color: ${props => props.online ? '#56A902' : '#EC534B'};
  color: white;
  font-weight: bold;
  font-size: 18px;
  text-align: center;
  box-shadow: 0px 4px 4px #CCCCCC;
  cursor: pointer;
`;

const Circle = styled.div`
  width: 52px;
  height: 52px;
  padding: 14px 8px 12px 8px;
  border: 2px solid #F8F8FF;
  border-radius: 50%;
`;

interface OnOffButtonProps {
  online: boolean;
  content: string;
  onClick?: any
}

const OnOffButton: FunctionComponent<OnOffButtonProps> = ({ online, onClick }) => {
  const content = online ? 'ON' : 'OFF';
  return (
    <Button online={online} onClick={onClick}>
      <Circle>
        {content}
      </Circle>
    </Button>
  );
};

export default OnOffButton;
export { OnOffButtonProps };
