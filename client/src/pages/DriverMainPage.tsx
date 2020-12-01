import React from 'react';
import { useSubscription } from '@apollo/client';
import { driverListen } from '../queries/driverListen';

function DriverMainPage() {
  const { loading, error, data } = useSubscription(driverListen);
  console.log (JSON.stringify(data))
  if(error){
    return <p>error</p>
  }
  if(loading){
    return <p>Loading...</p>
  }
  return  <p>riderId:</p>
}

export default DriverMainPage;
