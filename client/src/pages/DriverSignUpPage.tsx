import React from 'react';

import styled from 'styled-components';

import DriverSignUpFrom from '../components/containers/DriverSignUpFrom';
import Title from '../components/presentational/Title';
import SubTitle from '../components/presentational/SubTitle';

const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function DriverSignUpPage() {
  return (
    <Page>
      <Title content={'드라이버로 가입하기'} />
      <SubTitle content={'몇 분 안에 도착하는 안전하고 믿을 수 있는 차량'} />
      <DriverSignUpFrom />
    </Page>
  );
}

export default DriverSignUpPage;
