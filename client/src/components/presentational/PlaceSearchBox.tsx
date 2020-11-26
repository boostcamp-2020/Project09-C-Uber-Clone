import React, { FunctionComponent } from 'react';

import { Autocomplete } from '@react-google-maps/api';

import Input from './Input';

interface PlaceSearchBoxProps {
  placeholder: string;
  onChange?: any;
  value?: string;
}

const PlaceSearchBox: FunctionComponent<PlaceSearchBoxProps> = ({ placeholder, onChange, value }) => {
  return (
    <Autocomplete>
      <Input type='text' placeholder={placeholder} onChange={onChange} value={value} />
    </Autocomplete>
  );
};

export default PlaceSearchBox;
