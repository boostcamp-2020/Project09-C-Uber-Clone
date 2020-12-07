import React, { useState, useCallback, memo, useRef, useEffect } from 'react';
import { GoogleMap, Marker, DirectionsRenderer, DirectionsService, DistanceMatrixService } from '@react-google-maps/api';

import { useSelector, useDispatch } from 'react-redux';

import picker from '../../../assets/Google_Maps_pin.png';

import styled from 'styled-components';

import { reverseGoecoding } from '../../utils/geocoding';

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

enum TravelMode {
  BICYCLING = 'BICYCLING',
  DRIVING = 'DRIVING',
  TRANSIT = 'TRANSIT',
  TWO_WHEELER = 'TWO_WHEELER',
  WALKING = 'WALKING',
}

function RiderSetCourseMap() {
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
  const [directionResponse, setDirectionResponse] = useState(null);

  const pickerEl = useRef(null);

  const onLoad = useCallback((map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  const checkDestMarker = (address: string) => {
    dispatch(setDestPosition(NEW_MARKER_POS));
    dispatch(setDestPlace(address));
    dispatch(setDestMarker('check'));
  };

  const checkOriginMarker = (address: string) => {
    dispatch(setOriginPosition(NEW_MARKER_POS));
    dispatch(setOriginPlace(address));
    dispatch(setOriginMarker('check'));
  };

  const addMarker = async ({ lat, lng }: { lat: number, lng: number}) => {
    NEW_MARKER_POS.lat = lat;
    NEW_MARKER_POS.lng = lng;
    const address = await reverseGoecoding({ lat, lng });

    if (originMarker !== '') {
      return checkDestMarker(address);
    }
    checkOriginMarker(address);
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

  const directionCallback = useCallback((response: any, status: any) => {
    if (response !== null && status === 'OK') {
      setDirectionResponse(response);
    };
  }, []);

  useEffect(() => {
    if (originMarker === '') {
      setIsOriginVisible(false);
      setDirectionResponse(null);
      return;
    }
    setCenter(originPosition);
    setIsOriginVisible(true);
  }, [originMarker]);

  useEffect(() => {
    if (destMarker === '') {
      setIsDestVisible(false);
      setDirectionResponse(null);
      return;
    }
    setCenter(destPosition);
    setIsDestVisible(true);
  }, [destMarker]);

  const distanceMatrixCallback = (res: any) => {
    //TODO : 거리, 시간 계산
    console.log('res.rows : ', res.rows);
  };

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      zoom={14}
      onLoad={onLoad}
      onUnmount={onUnmount}
      center={originPosition}
      onDragEnd={onDragEnd}
      onDragStart={onDragStart}
    >
      <DistanceMatrixService
        callback={distanceMatrixCallback}
        options={{
          origins: [{ lat: 55.93, lng: -3.118 }, 'Greenwich, England'],
          destinations: ['Stockholm, Sweden', { lat: 50.087, lng: 14.421 }],
          travelMode: google.maps.TravelMode.DRIVING,
        }}
      />
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
      {originPlace !== '' && destPlace !== '' &&
        <DirectionsService
          options={{
            destination: destPosition,
            origin: originPosition,
            travelMode: TravelMode.DRIVING,
            drivingOptions: {
              departureTime: new Date(Date.now() + 1000),
              trafficModel: google.maps.TrafficModel.OPTIMISTIC,
            },
          }}
          callback={directionCallback}
        />
      }
      {directionResponse &&
        <DirectionsRenderer
          options={{
            directions: directionResponse,
            markerOptions: {
              visible: false,
            },
          }}
        />
      }
    </GoogleMap>
  );
}

export default memo(RiderSetCourseMap);
