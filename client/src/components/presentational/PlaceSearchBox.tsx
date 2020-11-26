import React, { useState, FunctionComponent } from 'react';

import { Autocomplete } from '@react-google-maps/api';

import { SearchBar, LocaleProvider } from 'antd-mobile';
import enUS from 'antd-mobile/lib/locale-provider/en_US';

interface PlaceSearchBoxProps {
  placeholder: string;
  onChange?: any;
  value?: string;
}

const PlaceSearchBox: FunctionComponent<PlaceSearchBoxProps> = ({ placeholder, onChange, value }) => {
  const [autocomplete, setAutocomplete] = useState(null);

  const onLoad = (autocomplete: any) => {
    setAutocomplete(autocomplete);
  };

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      setAutocomplete(autocomplete);
    }
  };

  return (
    <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
      <LocaleProvider locale={enUS}>
        <SearchBar placeholder={placeholder} onChange={onChange} value={value} />
      </LocaleProvider>
    </Autocomplete>
  );
};

export default PlaceSearchBox;
