import React from 'react';

import { LoadScript } from '@react-google-maps/api';

import RiderPickUpForm from '../components/containers/RiderPickUpForm';

function RiderPickUpPage() {
  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_API_KEY}>
      <RiderPickUpForm />
    </LoadScript>
  );
}

export default RiderPickUpPage;
