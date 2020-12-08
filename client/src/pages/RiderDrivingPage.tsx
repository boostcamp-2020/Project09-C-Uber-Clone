import React from 'react';

import { LoadScript } from '@react-google-maps/api';

import DrivingForm from '../components/containers/DrivingForm';

function RiderDrivingPage() {
  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_API_KEY}>
      <DrivingForm isRider={true} />
    </LoadScript>
  );
}

export default RiderDrivingPage;
