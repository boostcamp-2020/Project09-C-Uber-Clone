import React from 'react';

import styled from 'styled-components';

import CarTopViewIcon from '../presentational/CarTopViewIcon';

const FirstCircle = styled.div`
    position: absolute;
    width: 218px;
    height: 218px;

    background: rgba(117, 215, 1, 0.2);
    border-radius: 109px;
`;
const SecondCircle = styled.div`
    position: absolute;
    width: 134px;
    height: 134px;
    top: 42px;
    right: 42px;

    background: rgba(117, 215, 1, 0.2);
    border-radius: 67px;

    display: flex;
    justify-content: center;
    align-items: center;
`;
const ThirdCircle = styled.div`
    position: absolute;
    width: 64px;
    height: 64px;
    top: 35px;
    right: 35px;

    background: rgba(117, 215, 1, 0.2);
    border-radius: 32px;
`;

function CarLoadingImage() {
  return (
    <>
      <FirstCircle>
        <SecondCircle>
          <ThirdCircle />
          <CarTopViewIcon />
        </SecondCircle>
      </FirstCircle>
    </>
  );
}

export default CarLoadingImage;
