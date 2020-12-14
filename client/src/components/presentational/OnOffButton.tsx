import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

const Button = styled.button<{online: boolean}>`
  padding: 4px;
  border: none;
  border-radius: 50%;
  background-color: ${props => props.online ? '#EC534B' : '#56A902'};
  color: white;
  font-weight: bold;
  text-align: center;
  box-shadow: 0px 4px 4px #CCCCCC;
  cursor: pointer;
`;

const Circle = styled.div`
  padding: 12px 6px;
  border: 1.5px solid #F8F8FF;
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
