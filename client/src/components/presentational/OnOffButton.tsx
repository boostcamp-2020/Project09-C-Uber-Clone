import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

const Button = styled.button<{online: boolean}>`
  position: absolute;
  bottom: 16px;
  left: 0;
  right: 0;
  margin: auto;
  padding: 4px;
  border: none;
  border-radius: 50%;
  background-color: ${props => props.online ? '#EC534B' : '#56A902'};
  color: white;
  font-weight: bold;
  font-size: 18px;
  text-align: center;
  box-shadow: 0px 4px 4px #CCCCCC;
  cursor: pointer;
`;

const Circle = styled.div`
  padding: 16px 8px;
  border: 2px solid #F8F8FF;
  border-radius: 50%;
`;

interface OnOffButtonProps {
  online: boolean;
  content: string;
  onClick?: any
}

const OnOffButton: FunctionComponent<OnOffButtonProps> = ({ online, onClick }) => {
  const content = online ? '정지' : '시작';
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
