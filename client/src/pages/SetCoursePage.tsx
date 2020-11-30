import React from 'react';

import { LoadScript } from '@react-google-maps/api';

import SetCourseForm from '../components/containers/SetCourseForm';
import { Libraries } from '@react-google-maps/api/dist/utils/make-load-script-url';

const libraries: Libraries = ['places'];

function SetCoursePage() {
  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_API_KEY} libraries={libraries}>
      <SetCourseForm />
    </LoadScript>
  );
}

export default SetCoursePage;
