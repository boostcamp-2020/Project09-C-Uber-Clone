import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useSelector } from 'react-redux';

import { useQuery } from '@apollo/client';

import { WhiteSpace, Icon, Flex } from 'antd-mobile';

import styled from 'styled-components';

import { GET_TRIP } from '../queries/trip';

const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Paper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 80%;
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

function TripClosePage() {
  const [tripInfo, setTripInfo] = useState(null);
  const { loginReducer, tripReducer }: any = useSelector(state => state);
  const { trip } = tripReducer;
  const { loginRole } = loginReducer;
  const nextPage = loginRole === 'rider' ? '/rider/setcourse' : '/driver/main';

  const { loading, data: tripData } = useQuery(GET_TRIP, { variables: { id: trip.id } });

  useEffect(() => {
    if (tripData) {
      setTripInfo(tripData.trip);
    }
  }, [tripData]);

  return (
    <Page>
      {loading ? <div>정보를 불러오는 중 입니다</div> :
        <Paper>
          <Icon type="check-circle" size='lg' color='#56A902'/>
          <Title>your trip has ended</Title>
          <WhiteSpace />
          <Flex>
            <Flex.Item>
              <PlaceHeader>픽업 위치 : {tripInfo && tripInfo.origin.address}</PlaceHeader>
            </Flex.Item>
            <Flex.Item>
              <PlaceHeader>도착지 위치 : {tripInfo && tripInfo.destination.address}</PlaceHeader>
            </Flex.Item>
          </Flex>
          <Link to={nextPage}>
            <Button>확인</Button>
          </Link>
        </Paper>
      }
    </Page>
  );
}

export default TripClosePage;
