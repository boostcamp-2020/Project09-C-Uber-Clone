import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Map from '../components/containers/Map';

import { WhiteSpace } from 'antd-mobile';

import styled from 'styled-components';

import { selectPosition, setPosition } from '../slices/mapSlice';
import { useDispatch, useSelector } from 'react-redux';

const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Button = styled.button`
  background-color: #56A902;
  border: none;
  color: #fff;
  border-radius: 20px;
  margin: 10px;
`;
function SignUpSelectPage() {
  const position = useSelector(selectPosition);
  const dispatch = useDispatch();

  const handleClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: Position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          dispatch(setPosition(pos));
          console.log(position);
        },
        () => {
          console.log('Error: The Geolocation service failed.');
        },
      );
    } else {
      console.log('Error: Your browser doesn\'t support geolocation');
    }
  };
  return (
    <Page>
      <Map />
      <Button onClick={handleClick}>현재위치</Button>
      <WhiteSpace />
      <div>latitude: {position.lat}</div>
      <div>longitude: {position.lng}</div>
    </Page>
  );
}

export default SignUpSelectPage;
