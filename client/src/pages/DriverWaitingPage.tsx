import React from 'react';

import DriverCurrentPositionMap from '../components/containers/DriverCurrentPositionMap';
import { useSubscription } from '@apollo/client';
import { driverListen } from '../queries/callRequest';

function DriverWaitingPage() {
  const { loading, error, data } = useSubscription(driverListen, { onSubscriptionData: ({ subscriptionData: { data } }) => {
    console.log(data);
  } });
  console.log(JSON.stringify(data));
  if (error) {
    return <p>error</p>;
  }
  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <p>riderId:</p>
      <DriverCurrentPositionMap />
    </>
  );
}

export default DriverWaitingPage;
