import React, { useState, useEffect } from 'react';

import { useSubscription } from '@apollo/client';

import { driverListen } from '../queries/callRequest';

import DriverCurrentPositionMap from '../components/containers/DriverCurrentPositionMap';
import DriverPopup from '../components/presentational/DriverPopup';

function DriverWaitingPage() {
  const { loading, error, data } = useSubscription(driverListen);
  const [pickUpAddress, setPickUpAddress] = useState('');
  const [destinationAddress, setDestinationAddress] = useState('');

  useEffect(() => {
    if (data) {
      setPickUpAddress(data.driverListen.riderPublishInfo.pickUpAddress);
      setDestinationAddress(data.driverListen.riderPublishInfo.destinationAddress);
    }
  }, [data]);

  if (error) {
    console.log(error);
  }

  return (
    <>
      {pickUpAddress !== '' &&
      <DriverPopup
        pickUpAddress={pickUpAddress}
        destinationAddress={destinationAddress}
      />}
      <DriverCurrentPositionMap />
    </>
  );
}

export default DriverWaitingPage;
