import React, { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { useDispatch } from 'react-redux';

import { Flex, Icon, Steps, WhiteSpace } from 'antd-mobile';

import styled from 'styled-components';

import { setTrip, setRider } from '../../slices/tripSlice';

import IgnoreButton from '../presentational/IgnoreButton';
import SubmitButton from '../presentational/SubmitButton';

import { DRIVER_IGNORED, DRIVER_MATCHING_SUCCESS } from '../../constants/driverStatus';
import { ALREADY_MATCHED, MATCHING_SUCCESS, MATCHING_CANCEL } from '../../constants/matchingResult';

import { NOTIFY_DRIVER_RESPONSE } from '../../queries/driverResponded';

import ProgressBar from '../presentational/ProgressBar';

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
  font-size: 16px;
  font-weight: bold;
`;

const Expectation = styled.div`
  margin: 24px 0;
`;

const ExpectationHeader = styled.div`
  text-align: center;
  font-size: 30;
  font-weight: bold;
  color: #008000;
  margin-top: 50px;
`;

const Alert = styled.div`
  position: absolute;
  top: 30%;
  right: 0;
  left: 0;
  width: 360px;
  height: 360px;
  margin: auto;
  padding: 16px 12px;
  background-color: white;
  font-size: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 11;
`;

const Title = styled.h1`

`;

const DownArrow = styled.img`
  width: 20px;
`;

const COUNT_TIME = 7000;

function DriverPopup({ trip, setDriverStatus }:
  { trip:{id:string, origin:{address:string}, destination:{address:string}, rider:{id:string}, estimatedTime:string, estimatedDistance:string}, setDriverStatus:any}) {
  const dispatch = useDispatch();

  const [notifyDriverResponse] = useMutation(NOTIFY_DRIVER_RESPONSE, { variables: { response: 'confirm', riderId: trip.rider.id, tripId: trip.id } });

  const [status, setStatus] = useState('');

  const showAlert = (result:string) => {
    setStatus(result);
  };

  const handleClickIgnoreButton = () => {
    setDriverStatus(DRIVER_IGNORED);
  };

  const handleClickSubmitButton = async() => {
    const { data } = await notifyDriverResponse();
    if (data.sendResponse === MATCHING_SUCCESS) {
      return setDriverStatus(DRIVER_MATCHING_SUCCESS);
    }
    showAlert(data.sendResponse);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDriverStatus(DRIVER_IGNORED);
    }, COUNT_TIME);
    return () => clearTimeout(timer);
  }, []);

  const customIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 42 42" className="am-icon am-icon-md">
      <g fillRule="evenodd" stroke="transparent" strokeWidth="4">
        <path d="M21 0C9.402 0 0 9.402 0 21c0 11.6 9.402 21 21 21s21-9.4 21-21C42 9.402 32.598 0 21 0z" />
        <path fill="#FFF" d="M29 18.73c0-.55-.447-1-1-1H23.36l4.428-5.05c.407-.46.407-1.208 0-1.668-.407-.46-1.068-.46-1.476 0l-5.21 5.89-5.21-5.89c-.406-.46-1.067-.46-1.475 0-.406.46-.406 1.207 0 1.667l4.43 5.05H14.23c-.55 0-.998.45-.998 1 0 .554.448.97 1 .97h5.9v3.942h-5.9c-.552 0-1 .448-1 1s.448.985 1 .985h5.9v4.896c0 .552.448 1 1 1 .55 0 .968-.284.968-.836v-5.06H28c.553 0 1-.433 1-.985s-.447-1-1-1h-5.9v-3.94H28c.553 0 1-.418 1-.97z" />
      </g>
    </svg>
  );

  return (
    <ModalOverlay >
      <Modal>
        <Steps current={1}>
          <Steps.Step title="승차지" icon={customIcon()} description={trip.origin.address} />
          <Steps.Step title="하차지" icon={customIcon()} description={trip.destination.address} />
        </Steps>
        <Flex>
          <Flex.Item>
            <ExpectationHeader>예상 운행 시간 : {trip.estimatedTime}</ExpectationHeader>
          </Flex.Item>
          <Flex.Item>
            <ExpectationHeader>총 운행 거리 : {trip.estimatedDistance}</ExpectationHeader>
          </Flex.Item>
        </Flex>
        <WhiteSpace />
        <ProgressBar time={COUNT_TIME}/>
        <Flex>
          <Flex.Item>
            <IgnoreButton content='IGNORE' onClick={handleClickIgnoreButton} />
          </Flex.Item>
          <Flex.Item>
            <SubmitButton content='CONFIRM' disabled={false} onClick={handleClickSubmitButton} />
          </Flex.Item>
        </Flex>
      </Modal>
      {status === ALREADY_MATCHED &&
      <Alert>
        <div>이미 매칭이 완료되었습니다</div>
        <Icon style={{ marginTop: '20px' }} type={'cross-circle'} size={'lg'}/>
      </Alert>}
      {status === MATCHING_CANCEL &&
      <Alert >
        <div>라이더가 요청을 취소했습니다.</div>
        <Icon style={{ marginTop: '20px', color: 'red' }} type={'cross-circle'} size={'lg'}/>
      </Alert>}
    </ModalOverlay>
  );
}

export default DriverPopup;
