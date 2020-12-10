import React, { FunctionComponent } from 'react';

import styled from 'styled-components';

const Div = styled.div<{me: boolean}>`
  display: flex;
  justify-content: ${({ me }) => me ? 'flex-end' : 'flex-start'};
`;

const Text = styled.div<{me: boolean}>`
  order: ${({ me }) => me ? 100 : 0};
  max-width: 55%;
  padding: 8px;
  border: none;
  border-radius: 8px;
  background-color: ${({ me }) => me ? '#56A902' : '#F7F7F9'};
  color: ${({ me }) => me ? 'white' : 'black'};
  word-break: break-all;
`;

const Time = styled.div`
  align-self: flex-end;
  margin: 4px;
  font-size: 12px;
  color: rgba(170, 176, 183, 1);
`;

interface TextViewProps {
  text: string;
  me: boolean;
  time: string;
}

const ChattingText: FunctionComponent<TextViewProps> = ({ text, me, time }) => {
  return (
    <Div me={me}>
      <Text me={me}>{text}</Text>
      <Time>{time}</Time>
    </Div>
  );
};

export default ChattingText;
