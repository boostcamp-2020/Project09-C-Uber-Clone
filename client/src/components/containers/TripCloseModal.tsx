import React from 'react';
import { Link } from 'react-router-dom';

import { WhiteSpace, Icon, Flex } from 'antd-mobile';

import styled from 'styled-components';

const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Paper = styled.div`
  display: flex
  flex-direction: column;
  align-items: center;
  justify-content: center;
  widtht: 80%;
  height : 70%;
  box-shadow: 5px 5px 5px wheat;
`;

const Button = styled.button`
  background-color: #56A902;
  width: 329px;
  height: 180px;
  border: none;
  color: #fff;
  font-size: 24px;
  font-weight: 700;
  border-radius: 20px;
  margin: 10px;
`;

const Title = styled.h1`
  width: 89px;
  height: 29px;
  left: calc(50% - 89px/2 - 2.5px);
  top: calc(50% - 29px/2 - 329.5px);

  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 29px;
  margin-bottom: 120px;
`;

const PlaceHeader = styled.div`
  text-align: center;
  font-size: 18px;
  font-weight: bold;
`;

function TripCloseModal(trip:{id:string, origin:{address:string}, destination:{address:string}}) {
  const nextPage = '/rider/main';
  return (
    <Page>
      <Paper>
        <Icon type="check-circle" size='lg' color='#56A902'/>
        <Title>your trip has ended</Title>
        <WhiteSpace />
        <Flex>
          <Flex.Item>
            <PlaceHeader>픽업 위치 : {trip.origin.address}</PlaceHeader>
          </Flex.Item>
          <Flex.Item>
            <PlaceHeader>도착지 위치 : {trip.destination.address}</PlaceHeader>
          </Flex.Item>
        </Flex>
        <Link to={nextPage}>
          <Button>OK</Button>
        </Link>
      </Paper>
    </Page>
  );
}

export default TripCloseModal;
