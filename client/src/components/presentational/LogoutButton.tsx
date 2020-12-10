import React, { FunctionComponent, MouseEvent } from 'react';
import styled from 'styled-components';

interface LogoutButtonProps {
  width?: string;
  height?: string;
  color?: string;
  background?: string;
  onClick?: () => void;
}

const Circle = styled.div<{background?: string}>`
  display: flex;
  justify-content: center;
  padding: .5rem;
  border: none;
  border-radius: 100%;
  background: ${({ background }) => background || 'none'};
  align-text: center;
  box-shadow: ${({ background }) => {
    return background ?
      '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)}' :
      'none';
  }};
`;


const LogoutButton: FunctionComponent<LogoutButtonProps> = ({
  width = '32px',
  height = '32px',
  color = 'black',
  background, onClick,
}) => {
  return (
    <Circle background={background} onClick={onClick}>
      <svg width={width} height={height} version="1.1" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" fill={color}>
        <path d="m255.15 468.62h-191.36c-11.737 0-21.262-9.526-21.262-21.262v-382.72c0-11.737 9.526-21.262 21.262-21.262h191.36c11.758 0 21.262-9.504 21.262-21.262s-9.504-21.264-21.262-21.264h-191.36c-35.168 0-63.787 28.62-63.787 63.788v382.72c0 35.168 28.619 63.787 63.787 63.787h191.36c11.758 0 21.262-9.504 21.262-21.262s-9.504-21.262-21.262-21.262z"/>
        <path d="m505.66 240.86-129.28-127.58c-8.335-8.25-21.815-8.143-30.065 0.213s-8.165 21.815 0.213 30.065l92.385 91.173h-247.56c-11.758 0-21.262 9.504-21.262 21.262s9.504 21.263 21.262 21.263h247.56l-92.385 91.173c-8.377 8.25-8.441 21.709-0.213 30.065 4.167 4.21 9.653 6.336 15.139 6.336 5.401 0 10.801-2.041 14.926-6.124l129.28-127.58c4.04-3.997 6.336-9.441 6.336-15.139 0-5.696-2.275-11.118-6.336-15.137z"/>
      </svg>
    </Circle>
  );
};

export default LogoutButton;
