import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

const Button = styled.button<{backgroundColor: string, textColor: string}>`
  padding: 4px;
  border: none;
  border-radius: 50%;
  background-color: ${props => props.backgroundColor || 'white'};
  color: ${props => props.textColor || 'black'};
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

interface CircleButtonProps {
  backgroundColor: string;
  textColor: string;
  content: string;
  onClick?: any
}

const CircleButton: FunctionComponent<CircleButtonProps> = ({ backgroundColor, textColor, content, onClick }) => {
  return (
    <Button backgroundColor={backgroundColor} textColor={textColor} onClick={onClick}>
      <Circle>
        {content}
      </Circle>
    </Button>
  );
};

export default CircleButton;
export { CircleButtonProps };
