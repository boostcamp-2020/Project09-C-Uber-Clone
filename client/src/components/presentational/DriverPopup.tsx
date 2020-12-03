import React from 'react';

import { Flex } from 'antd-mobile';

import styled from 'styled-components';

import IgnoreButton from '../presentational/IgnoreButton';
import SubmitButton from '../presentational/SubmitButton';

const Modal = styled.div`
  position: absolute;
  top: 30%;
  right: 0;
  left: 0;
  width: 360px;
  margin: auto;
  padding: 16px 12px;
  background-color: white;
  z-index: 10;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 50%);
  z-index: 9;
`;

const PlaceHeader = styled.div`
  text-align: center;
  font-size: 18px;
  font-weight: bold;
`;

const Expectation = styled.div`
  margin: 24px 0;
`;

const ExpectationHeader = styled.div`
  text-align: center;
  color: gray;
`;

function DriverPopup({ pickUpAddress, destinationAddress }:{ pickUpAddress: string, destinationAddress: string }) {
  //TODO: IGONRE 버튼 클릭 시 다음 호출 대기
  //TODO: CONFIRM 버튼 클릭 시 driverResponse mutate,
  //      response의 result가 success 이면 callRequested subscription 취소 후 다음 화면
  //      response의 result가 fail 이면 다음 호출 대기
  return (
    <>
      <ModalOverlay />
      <Modal>
        <Flex>
          <Flex.Item>
            <PlaceHeader>픽업 위치 : {pickUpAddress}</PlaceHeader>
          </Flex.Item>
          <Flex.Item>
            <PlaceHeader>도착지 위치 : {destinationAddress}</PlaceHeader>
          </Flex.Item>
        </Flex>
        <Expectation>
          <ExpectationHeader>예상 금액 및 예상 시간</ExpectationHeader>
        </Expectation>
        <Flex>
          <Flex.Item>
            <IgnoreButton content='IGNORE' />
          </Flex.Item>
          <Flex.Item>
            <SubmitButton content='CONFIRM' disabled={false} onClick={false} />
          </Flex.Item>
        </Flex>
      </Modal>
    </>
  );
}

export default DriverPopup;
