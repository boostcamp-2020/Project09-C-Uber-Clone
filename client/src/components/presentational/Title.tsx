import React, { FunctionComponent } from 'react';

import styled from 'styled-components';

const H1 = styled.h1`
  font-weight: bold;
  font-size: 24px;
  line-height: 29px;
`;

interface TitleProps {
  content: string;
}

const Title: FunctionComponent<TitleProps> = ({ content }) => {
  return (
    <H1>{content}</H1>
  );
};

export default Title;
