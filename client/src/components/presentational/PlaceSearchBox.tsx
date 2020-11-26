import React, { useState, FunctionComponent } from 'react';

import { Autocomplete } from '@react-google-maps/api';

interface PlaceSearchBoxProps {
  placeholder: string;
}

const PlaceSearchBox: FunctionComponent<PlaceSearchBoxProps> = ({ placeholder }) => {
  const [autocomplete, setAutocomplete] = useState(null);

  const onLoad = (autocomplete: any) => {
    setAutocomplete(autocomplete);
  };

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      console.log(autocomplete.getPlace().geometry.location.lat());
      console.log(autocomplete.getPlace().geometry.location.lng());
      setAutocomplete(autocomplete.getPlace());
    }
  };

  return (
    <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged} fields={['geometry']}>
      <input placeholder={placeholder} style={{ width: '100%' }}/>
    </Autocomplete>
  );
};

export default PlaceSearchBox;
