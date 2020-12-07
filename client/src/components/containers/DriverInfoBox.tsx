import React, { useState } from 'react';

import styled from 'styled-components';

const Modal = styled.div`
  width: 100%;
  height: 25vh;
  margin: auto;
  padding: 20px;
  background-color: white;
`;

const DriverInfo = styled.div`
  margin: 10px 0 24px 0;
  display: flex;
  justify-content: space-between;
`;

const DriverName = styled.div`
  text-align: left;
  font-size: 18px;
  font-weight: bold;
`;

const CarInfo = styled.div`
  padding: 8px;
  background-color: #e0e0e0;
  border-radius: 12px;
  font-size: 15px;
  text-align: center;
  color: gray;
`;

const Buttons = styled.div`
    display: flex;
    justify-content: space-between;
`;

const ChatButton = styled.button`
    width: 54%;
    height: 50px;
    background-color: #56A902;
    color: #ffffff;
    border:none;
    border-radius: 15px;
`;

const CancelButton = styled.button`
    width: 45%;
    height: 50px;
    background-color: #ffffff;
    border: 0.5px solid #e0e0e0;
    border-radius: 15px;
`;

function DriverInfoBox() {
  return (
    <>
      <Modal>
        <DriverInfo>
          <DriverName>
          드라이버 이름
          </DriverName>
          <CarInfo>
            <div>차번호</div>
            <div>차종류</div>
          </CarInfo>
        </DriverInfo>
        <Buttons>
          <ChatButton>채팅하기</ChatButton>
          <CancelButton>취소하기</CancelButton>
        </Buttons>
      </Modal>
    </>
  );
}

export default DriverInfoBox;
