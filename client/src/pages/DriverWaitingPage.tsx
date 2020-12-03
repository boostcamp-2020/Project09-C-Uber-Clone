import React, { useState, useEffect } from 'react';

import { useSubscription } from '@apollo/client';

import { driverListen } from '../queries/callRequest';

import DriverCurrentPositionMap from '../components/containers/DriverCurrentPositionMap';
import DriverPopup from '../components/presentational/DriverPopup';

function DriverWaitingPage() {
  const { loading, error, data } = useSubscription(driverListen);
  const [riderCalls, setRiderCalls] = useState([]);

  useEffect(() => {
    if (data) {
      setRiderCalls([...riderCalls, data]);
    }
  }, [data]);

  if (error) {
    console.log(error);
  }

  return (
    <>
      {riderCalls.length > 0 && <DriverPopup />}
      <DriverCurrentPositionMap />
    </>
  );
}

export default DriverWaitingPage;
