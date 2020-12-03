import React from 'react';

import { LoadScript } from '@react-google-maps/api';

import DriverPickUpForm from '../components/containers/DriverPickUpForm';

function DriverPickUpPage() {
  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_API_KEY}>
      <DriverPickUpForm />
    </LoadScript>
  );
}

export default DriverPickUpPage;
