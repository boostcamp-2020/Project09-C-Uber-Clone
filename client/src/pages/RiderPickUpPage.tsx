import React from 'react';

import { LoadScript } from '@react-google-maps/api';
import { Libraries } from '@react-google-maps/api/dist/utils/make-load-script-url';
const libraries: Libraries = ['places'];

import RiderPickUpForm from '../components/containers/RiderPickUpForm';

function RiderPickUpPage() {
  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_API_KEY} libraries={libraries}>
      <RiderPickUpForm />
    </LoadScript>
  );
}

export default RiderPickUpPage;
