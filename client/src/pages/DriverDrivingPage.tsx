import React from 'react';

import { LoadScript } from '@react-google-maps/api';

import DrivingForm from '../components/containers/DrivingForm';

function DriverDrivingPage() {
  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_API_KEY}>
      <DrivingForm isRider={false} />
    </LoadScript>
  );
}

export default DriverDrivingPage;
