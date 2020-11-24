import React from 'react';

import styled from 'styled-components';

import RiderSignUpForm from '../components/containers/RiderSignUpForm';

const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-weight: bold;
  font-size: 24px;
  line-height: 29px;
`;

const SubTitle = styled.h2`
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  margin: -10px 0 100px 0;
`;

function RiderSignUpPage() {
  return (
    <Page>
      <Title>라이더로 가입하기</Title>
      <SubTitle>몇 분 안에 도착하는 안전하고 믿을 수 있는 차량</SubTitle>
      <RiderSignUpForm />
    </Page>
  );
}

export default RiderSignUpPage;
