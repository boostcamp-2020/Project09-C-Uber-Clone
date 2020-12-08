import React, { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { useDispatch } from 'react-redux';

import { Flex, Icon } from 'antd-mobile';

import styled from 'styled-components';

import { setTrip, setRider } from '../../slices/tripSlice';

import IgnoreButton from '../presentational/IgnoreButton';
import SubmitButton from '../presentational/SubmitButton';

import { DRIVER_IGNORED, DRIVER_MATCHING_SUCCESS } from '../../constants/driverStatus';
import { ALREADY_MATCHED, MATCHING_SUCCESS, MATCHING_CANCEL } from '../../constants/matchingResult';

import { NOTIFY_DRIVER_RESPONSE } from '../../queries/driverResponded';

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

const LoadingIcon = styled.div`
  text-align: center;
`;

const Counter = styled.div`
  text-align: center;
  font-size: 20px;
  margin: 6px 0 20px 0;
  font-weight: bolder;
`;

const COUNT_TIME = 7000;

function DriverPopup({ trip, setDriverStatus }:
  { trip:{id:string, origin:{address:string}, destination:{address:string}, rider:{id:string}}, setDriverStatus:any}) {
  const dispatch = useDispatch();

  const [notifyDriverResponse] = useMutation(NOTIFY_DRIVER_RESPONSE, { variables: { response: 'confirm', riderId: trip.rider.id, tripId: trip.id } });

  const [status, setStatus] = useState('');
  const [count, setCount] = useState(COUNT_TIME / 1000);

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
    const { data } = await notifyDriverResponse();
    if (data.sendResponse === MATCHING_SUCCESS) {
      dispatch(setTrip({ id: trip.id }));
      dispatch(setRider({ id: trip.rider.id }));
      return setDriverStatus(DRIVER_MATCHING_SUCCESS);
    }
    showAlert(data.sendResponse);
  };

  const disCount = () => {
    setTimeout(() => {
      setCount(count - 1);
    }, 1000);
  };

  useEffect(() => {
    disCount();
  }, [count]);

  useEffect(() => {
    setTimeout(() => {
      setDriverStatus(DRIVER_IGNORED);
    }, COUNT_TIME);
  }, []);

  return (
    <ModalOverlay >
      <Modal>
        <Flex>
          <Flex.Item>
            <PlaceHeader>픽업 위치 : {trip.origin.address}</PlaceHeader>
          </Flex.Item>
          <Flex.Item>
            <PlaceHeader>도착지 위치 : {trip.destination.address}</PlaceHeader>
          </Flex.Item>
        </Flex>
        <Expectation>
          <ExpectationHeader>예상 금액 및 예상 시간</ExpectationHeader>
        </Expectation>
        <LoadingIcon>
          <Icon type='loading' size='lg'/>
        </LoadingIcon>
        <Counter>{count}</Counter>
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
