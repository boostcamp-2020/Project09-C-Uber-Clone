import React, { useState, useCallback, memo, useRef, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

import { useSelector, useDispatch } from 'react-redux';

import picker from '../../../assets/Google_Maps_pin.png';

import styled from 'styled-components';

import {
  selectMapReducer,
  setOriginPosition,
  setDestPosition,
  setOriginPlace,
  setDestPlace,
  setOriginMarker,
  setDestMarker,
} from '../../slices/mapSlice';

const Picker = styled.img`
  position: absolute;
  top: 40%;
  left: 47%;
  width: 20px;
  z-index: 100;
  display: none;
`;

// Map 사이즈
const containerStyle = {
  width: '100%',
  height: '380px',
};

// Marker 위치
const NEW_MARKER_POS = {
  lat: 0,
  lng: 0,
};

const INIT_POS = {
  lat: 37.55,
  lng: 126.97,
};

function Map() {
  const {
    originPosition,
    destPosition,
    originMarker,
    destMarker,
    originPlace,
    destPlace,
  }: any = useSelector(selectMapReducer);
  const dispatch = useDispatch();

  const [map, setMap] = useState(null);
  const [isOriginVisible, setIsOriginVisible] = useState(false);
  const [isDestVisible, setIsDestVisible] = useState(false);
  const [center, setCenter] = useState(INIT_POS);

  const pickerEl = useRef(null);

  const onLoad = useCallback((map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  const checkDestMarker = (tempPlace: string) => {
    dispatch(setDestPosition(NEW_MARKER_POS));
    dispatch(setDestPlace(tempPlace));
    dispatch(setDestMarker('check'));
  };

  const checkOriginMarker = (tempPlace: string) => {
    dispatch(setOriginPosition(NEW_MARKER_POS));
    dispatch(setOriginPlace(tempPlace));
    dispatch(setOriginMarker('check'));
  };

  const addMarker = ({ lat, lng }: { lat: number, lng: number}) => {
    NEW_MARKER_POS.lat = lat;
    NEW_MARKER_POS.lng = lng;
    const tempPlace = `위도 :${NEW_MARKER_POS.lat} 경도:${NEW_MARKER_POS.lng}`;

    if (originMarker === 'check') {
      return checkDestMarker(tempPlace);
    }
    checkOriginMarker(tempPlace);
  };

  const onDragEnd = () => {
    pickerEl.current.style.display = 'none';
    if (!(isDestVisible && isOriginVisible)) {
      addMarker(JSON.parse(JSON.stringify(map.center)));
    }
  };

  const onDragStart = () => {
    if (!(isDestVisible && isOriginVisible)) {
      pickerEl.current.style.display = 'block';
    }
  };

  useEffect(() => {
    if (originMarker === '') {
      setIsOriginVisible(false);
      return;
    }
    setCenter(originPosition);
    setIsOriginVisible(true);
  }, [originMarker]);

  useEffect(() => {
    if (destMarker === '') {
      setIsDestVisible(false);
      return;
    }
    setCenter(destPosition);
    setIsDestVisible(true);
  }, [destMarker]);

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      zoom={14}
      onLoad={onLoad}
      onUnmount={onUnmount}
      center={center}
      onDragEnd={onDragEnd}
      onDragStart={onDragStart}
    >
      <Picker src={picker} ref={pickerEl} />
      <Marker
        key={1}
        position={originPosition}
        label={'출발'}
        visible={isOriginVisible}
      />
      <Marker
        key={2}
        position={destPosition}
        label={'도착'}
        visible={isDestVisible}
      />
    </GoogleMap>
  );
}

export default memo(Map);
