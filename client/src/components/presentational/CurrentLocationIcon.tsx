import React from 'react';

import styled from 'styled-components';

const Div = styled.div`
    width: 30px;
    height: 30px;
`;

const CurrentLocationIcon = () => {

  return <Div>
    <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
      <path d="m512 256c0 141.386719-114.613281 256-256 256s-256-114.613281-256-256 114.613281-256 256-256 256 114.613281 256 256zm0 0" fill="#5153ff" fillOpacity="0.3"/>
      <path d="m384 256c0 70.691406-57.308594 128-128 128s-128-57.308594-128-128 57.308594-128 128-128 128 57.308594 128 128zm0 0" fill="#5153ff"/>
    </svg>
  </Div>;
};

export default CurrentLocationIcon;
