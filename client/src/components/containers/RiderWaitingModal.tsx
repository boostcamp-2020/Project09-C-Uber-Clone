import React from 'react';

import styled from 'styled-components';

import CarLoadingImage from '../presentational/CarLoadingImage';
import PickUpCancelButton from '../presentational/PickUpCancelButton';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 80%);
  z-index: 9;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Message = styled.div`
  position: absolute;
  bottom: 20%;
  right: 0;
  left: 0;
  padding: 16px 12px;
  background-color: transparent;
  z-index: 10;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  color: rgba(117, 215, 1, 0.6);
`;

function RiderWaitingForm() {
  return (
    <>
      <Overlay >
        <CarLoadingImage />
      </Overlay>
      <PickUpCancelButton content={'호출 취소'} onClick={false}/>
      <Message >Searching for a driver..</Message>
    </>
  );
}

export default RiderWaitingForm;
