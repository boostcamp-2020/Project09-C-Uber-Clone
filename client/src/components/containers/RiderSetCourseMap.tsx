import React, { useState, useCallback, memo, useRef, useEffect } from 'react';
import { GoogleMap, Marker, DirectionsRenderer, DirectionsService, DistanceMatrixService } from '@react-google-maps/api';

import { useSelector, useDispatch } from 'react-redux';

import { Button } from 'antd-mobile';

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

const Picker = styled.div`
  width: 7px;
  height: 7px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  background-color: #FF1493;
  border-radius: 50%;
`;

// Map 사이즈
const containerStyle = {
  width: '100%',
  height: '500px',
};

// Marker 위치
const NEW_MARKER_POS = {
  lat: 0,
  lng: 0,
};

const SelectButton = styled.div`
  position: absolute;
  top: 460px;
  left: 50%;
  transform:translate(-50%, -50%);
  text-align: center;
`;

enum TravelMode {
  BICYCLING = 'BICYCLING',
  DRIVING = 'DRIVING',
  TRANSIT = 'TRANSIT',
  TWO_WHEELER = 'TWO_WHEELER',
  WALKING = 'WALKING',
}

function RiderSetCourseMap({ setEstimatedDistance, setEstimatedTime }: { setEstimatedDistance: any, setEstimatedTime: any}) {
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
  const [center, setCenter] = useState({ lat: 0, lng: 0 });
  const [directionResponse, setDirectionResponse] = useState(null);
  const [selectButtonDisplay, setSelectButtonDisplay] = useState('inline-block');

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

  const getCurrentRiderPos = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setCenter(pos);
      });
    }
  };

  const directionCallback = useCallback((response: any, status: any) => {
    if (response !== null && status === 'OK') {
      pickerEl.current.style.display = 'none';
      setSelectButtonDisplay('none');
      setDirectionResponse(response);
    };
  }, []);

  useEffect(() => {
    if (originMarker === '') {
      setIsOriginVisible(false);
      setDirectionResponse(null);
      if (pickerEl.current) {
        pickerEl.current.style.display = 'inline-block';
      }
      setSelectButtonDisplay('inline-block');
      return;
    }
    setCenter(originPosition);
    setIsOriginVisible(true);
  }, [originMarker]);

  useEffect(() => {
    if (destMarker === '') {
      setIsDestVisible(false);
      setDirectionResponse(null);
      if (pickerEl.current) {
        pickerEl.current.style.display = 'inline-block';
      }
      setSelectButtonDisplay('inline-block');
      return;
    }
    setCenter(destPosition);
    setIsDestVisible(true);
  }, [destMarker]);

  useEffect(() => {
    getCurrentRiderPos();
  }, []);

  const distanceMatrixCallback = ({ rows }: any) => {
    if (rows[0].elements[0].status === 'OK') {
      setEstimatedDistance(rows[0].elements[0].distance.text);
      setEstimatedTime(rows[0].elements[0].duration.text);
    }
  };

  const selectPinPosition = async() => {
    const lat = JSON.parse(JSON.stringify(map.center)).lat;
    const lng = JSON.parse(JSON.stringify(map.center)).lng;

    NEW_MARKER_POS.lat = lat;
    NEW_MARKER_POS.lng = lng;

    const address = await reverseGoecoding({ lat, lng });

    if (originMarker !== '') {
      return checkDestMarker(address);
    }
    checkOriginMarker(address);
  };

  return (
    <>
      <GoogleMap
        mapContainerStyle={containerStyle}
        zoom={14}
        onLoad={onLoad}
        onUnmount={onUnmount}
        center={center}
      >
        <DistanceMatrixService
          callback={distanceMatrixCallback}
          options={{
            origins: [originPosition],
            destinations: [destPosition],
            travelMode: google.maps.TravelMode.DRIVING,
            drivingOptions: {
              departureTime: new Date(Date.now() + 1000),
              trafficModel: google.maps.TrafficModel.OPTIMISTIC,
            },
          }}
        />
        <Picker ref={pickerEl} />
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
          callback={directionCallback}
          options={{
            destination: destPosition,
            origin: originPosition,
            travelMode: TravelMode.DRIVING,
          }}
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
      <SelectButton>
        <Button
          type="primary"
          inline
          style={{
            backgroundColor: '#FF1493',
            display: `${selectButtonDisplay}`,
          }}
          onClick={selectPinPosition}
        >
          경로선택
        </Button>
      </SelectButton>
    </>
  );
}

export default memo(RiderSetCourseMap);
