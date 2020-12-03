import React from 'react';

import RiderPickupPositionMap from '../components/containers/RiderPickupPositionMap';
import RiderWaitingModal from '../components/containers/RiderWaitingModal';

function RiderWaitingPage() {
  return (
    <>
      <RiderPickupPositionMap />
      <RiderWaitingModal />
    </>
  );
}

export default RiderWaitingPage;
