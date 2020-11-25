import React, { FunctionComponent } from 'react';

import styled from 'styled-components';

const H2 = styled.h2`
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  margin: -10px 0 30px 0;
`;

interface SubTitleProps {
  content: string;
}

const SubTitle: FunctionComponent<SubTitleProps> = ({ content }) => {
  return (
    <H2>{content}</H2>
  );
};

export default SubTitle;
