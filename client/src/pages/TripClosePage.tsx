import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import { useQuery } from '@apollo/client';

import { WhiteSpace, Icon, Steps } from 'antd-mobile';

import styled from 'styled-components';

import { GET_TRIP } from '../queries/trip';
import { setTrip } from '../slices/tripSlice';

const Page = styled.div`
  width: 100vw;
  height: 100vh;
`;

const Paper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width:90%;
  margin: 5% auto;
  height: 95%;
  box-shadow: 5px 1px 10px 2px grey;
  padding: 17% 10%;
`;

const Button = styled.button`
  background-color: #56A902;
  width: 100px;
  height: 60px;
  border: none;
  color: #fff;
  font-size: 24px;
  font-weight: 700;
  border-radius: 20px;
  margin: 10px;
`;

const Title = styled.h1`
  left: calc(50% - 89px/2 - 2.5px);
  top: calc(50% - 29px/2 - 329.5px);

  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 29px;
  margin-bottom: 50px;
  margin-top: 30px;
`;

function TripClosePage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [tripInfo, setTripInfo] = useState(null);
  const { loginReducer, tripReducer }: any = useSelector(state => state);
  const { trip } = tripReducer;
  const { loginRole } = loginReducer;
  const nextPage = loginRole === 'rider' ? '/rider/setcourse' : '/driver/main';

  const { loading, data: tripData } = useQuery(GET_TRIP, { variables: { id: trip.id }, fetchPolicy: 'no-cache' });

  const customIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 42 42" className="am-icon am-icon-md">
      <g fillRule="evenodd" stroke="transparent" strokeWidth="4">
        <path d="M21 0C9.402 0 0 9.402 0 21c0 11.6 9.402 21 21 21s21-9.4 21-21C42 9.402 32.598 0 21 0z" />
        <path fill="#FFF" d="M29 18.73c0-.55-.447-1-1-1H23.36l4.428-5.05c.407-.46.407-1.208 0-1.668-.407-.46-1.068-.46-1.476 0l-5.21 5.89-5.21-5.89c-.406-.46-1.067-.46-1.475 0-.406.46-.406 1.207 0 1.667l4.43 5.05H14.23c-.55 0-.998.45-.998 1 0 .554.448.97 1 .97h5.9v3.942h-5.9c-.552 0-1 .448-1 1s.448.985 1 .985h5.9v4.896c0 .552.448 1 1 1 .55 0 .968-.284.968-.836v-5.06H28c.553 0 1-.433 1-.985s-.447-1-1-1h-5.9v-3.94H28c.553 0 1-.418 1-.97z" />
      </g>
    </svg>
  );

  const handleClickConfirm = () => {
    dispatch(setTrip({ id: undefined }));
    history.push(nextPage);
  };

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
          <Steps current={1}>
            <Steps.Step title="승차지" icon={customIcon()} description={tripInfo && tripInfo.origin.address} />
            <Steps.Step title="하차지" icon={customIcon()} description={tripInfo && tripInfo.destination.address} />
          </Steps>
          <WhiteSpace />
          <Button onClick={handleClickConfirm}>확인</Button>
        </Paper>
      }
    </Page>
  );
}

export default TripClosePage;
