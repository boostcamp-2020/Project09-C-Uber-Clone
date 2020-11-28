import React, { useState, FunctionComponent } from 'react';

import styled from 'styled-components';

import { Autocomplete } from '@react-google-maps/api';

interface PlaceSearchBoxProps {
  placeholder: string;
  onLoad: any;
  onPlaceChanged: any;
  onCancelClicked?: any;
  value: string;
  onChange?: any
}

const CancelButton = styled.button`
  padding: 0 3px;
  background-color: transparent;
  border-radius: 50%;
  border: 0.5px solid #989898;
  color: #989898;
  cursor: pointer;
`;

const Input = styled.input`
  width: 100%;
`;

const PlaceSearchBox: FunctionComponent<PlaceSearchBoxProps> = ({ placeholder, onLoad, onPlaceChanged, onCancelClicked, value, onChange }) => {
  console.log(value);
  return (
    <>
      <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged} fields={['geometry', 'address_components', 'name']}>
        <Input placeholder={placeholder} value={value} onChange={onChange}/>
      </Autocomplete>
      <CancelButton onClick={onCancelClicked}>
        X
      </CancelButton>
    </>
  );
};

export default PlaceSearchBox;