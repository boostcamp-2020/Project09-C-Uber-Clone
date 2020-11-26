import React from 'react';

import styled from 'styled-components';

import RiderSignUpForm from '../components/containers/RiderSignUpForm';
import Title from '../components/presentational/Title';
import SubTitle from '../components/presentational/SubTitle';

const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function RiderSignUpPage() {
  return (
    <Page>
      <Title content={'라이더로 가입하기'}/>
      <SubTitle content={'몇 분 안에 도착하는 안전하고 믿을 수 있는 차량'} />
      <RiderSignUpForm />
    </Page>
  );
}

export default RiderSignUpPage;
