import React from 'react';

import styled from 'styled-components';
import { Icon } from 'antd-mobile';

const Div = styled.div`
    display: absolute;
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Message = styled.div`
  margin-top: 10px;
  color: #56A902
`;
const LoadingView = ({ message }:{message?:string}) => {

  return (
    <Div>
      <Icon type={'loading'} size={'lg'}/>
      <Message>{message || '로딩중입니다'}</Message>
    </Div>
  );
};

export default LoadingView;
