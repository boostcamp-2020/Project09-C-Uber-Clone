import React, { useState, useCallback, memo, useRef } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

import { useSelector } from 'react-redux';

import picker from '../../../assets/Google_Maps_pin.png';

import { selectPosition } from '../../slices/mapSlice';

// Map 사이즈
const containerStyle = {
  width: '100%',
  height: '380px',
};


import styled from 'styled-components';

const Picker = styled.img`
  position: absolute;
  top: 165px;
  left: 190px;
  width: 20px;
  z-index: 100;
  display: none;
`;

// Map 사이즈
// const containerStyle = {
//   width: '400px',
//   height: '400px',
// };

// 처음 map의 위치
const center = {
  lat: 37.512359618923725,
  lng: 126.86565258928634,
};

// Marker 위치
const NEW_MARKER_POS = {
  lat: 0,
  lng: 0,
};

function Map() {
  const [map, setMap] = useState(null);
  const position = useSelector(selectPosition);
  const [markers, setMarkers] = useState([]);
  const pickerEl = useRef(null);

  const onLoad = useCallback((map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  const addMarker = ({ lat, lng }: { lat: number, lng: number}) => {
    NEW_MARKER_POS.lat = lat;
    NEW_MARKER_POS.lng = lng;

    if (markers.length === 1) {
      return setMarkers([...markers,
        <Marker
          key={markers.length + 1}
          position={NEW_MARKER_POS}
          label={'도착'}
        />,
      ]);
    }
    return setMarkers([...markers,
      <Marker
        key={markers.length + 1}
        position={NEW_MARKER_POS}
        label={'출발'}
      />,
    ]);
  };

  const onDragEnd = () => {
    pickerEl.current.style.display = 'none';
    if (markers.length < 2) {
      addMarker(JSON.parse(JSON.stringify(map.center)));
    }
  };

  const onDragStart = () => {
    if (markers.length < 2) {
      pickerEl.current.style.display = 'block';
    }
  };

  return (
    <LoadScript
      googleMapsApiKey={process.env.REACT_APP_API_KEY}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        zoom={15}
        onLoad={onLoad}
        onUnmount={onUnmount}
        center={position}
        // center={center}
        onDragEnd={onDragEnd}
        onDragStart={onDragStart}
      >
        <Picker src={picker} ref={pickerEl} />
        {markers.map(marker => marker)}
      </GoogleMap>
    </LoadScript>
  );
}

export default memo(Map);
