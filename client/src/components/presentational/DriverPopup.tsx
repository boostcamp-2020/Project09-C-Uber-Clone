import React, { useEffect, useState } from 'react';
import { useApolloClient } from '@apollo/client';
import { useDispatch } from 'react-redux';

import { Flex } from 'antd-mobile';

import styled from 'styled-components';

import { sendDriverResponse } from '../../apis/driverResponseAPI';

import IgnoreButton from '../presentational/IgnoreButton';
import SubmitButton from '../presentational/SubmitButton';

import { DRIVER_IGNORED, DRIVER_MATCHING_SUCCESS } from '../../constants/driverStatus';
import { ALREADY_MATCHED, MATCHING_SUCCESS, MATCHING_CANCEL } from '../../constants/matchingResult';

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

const Alert = styled.div`
  position: absolute;
  top: 30%;
  right: 0;
  left: 0;
  width: 360px;
  height: 180px;
  margin: auto;
  padding: 16px 12px;
  background-color: white;
  font-size: 30px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 11;
`;

const PAYLOAD = { response: 'confirm', riderId: '5fbf5149f35512f0653ec7f1', tripId: '5fc7a18bab179a163b73302b' };

function DriverPopup({ setDriverStatus, pickUpAddress, destinationAddress }:
  { setDriverStatus:any, pickUpAddress: string, destinationAddress: string}) {
  const client = useApolloClient();
  const dispatch = useDispatch();
  const [status, setStatus] = useState('');

  const showAlert = (result:string) => {
    setStatus(result);
    setTimeout(() => {
      setDriverStatus(DRIVER_IGNORED);
    }, 2000);
  };

  const handleClickIgnoreButton = () => {
    setDriverStatus(DRIVER_IGNORED);
  };

  const handleClickSubmitButton = async() => {
    const { result, riderId, tripId } = await sendDriverResponse(client, dispatch, PAYLOAD);
    if (result === MATCHING_SUCCESS) {
      return setDriverStatus(DRIVER_MATCHING_SUCCESS);
    } else {
      showAlert(result);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setDriverStatus(DRIVER_IGNORED);
    }, 5000);
  });
  return (

    <ModalOverlay >
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
            <IgnoreButton content='IGNORE' onClick={handleClickIgnoreButton} />
          </Flex.Item>
          <Flex.Item>
            <SubmitButton content='CONFIRM' disabled={false} onClick={handleClickSubmitButton} />
          </Flex.Item>
        </Flex>
      </Modal>
      {status === ALREADY_MATCHED && <Alert><div>이미 매칭 완료된 요청</div></Alert>}
      {status === MATCHING_CANCEL && <Alert ><div>취소된 요청</div></Alert>}
    </ModalOverlay>

  );
}

export default DriverPopup;
