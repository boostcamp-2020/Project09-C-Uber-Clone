import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useQuery, useSubscription, useMutation } from '@apollo/client';

import { GoogleMap, DistanceMatrixService } from '@react-google-maps/api';

import { LISTEN_MATCHED_DRIVER_STATE } from '../../queries/rider';
import { GET_ORIGIN_POSITION_AND_DESTINATION_POSITION, SET_ARRIVAL_DATA } from '../../queries/trip';

import { selectTripReducer } from '../../slices/tripSlice';

import DrivingMap from '../containers/DrivingMap';
import RiderInfoBox from '../containers/RiderInfoBox';
import TripInfoBox from '../presentational/TripInfoBox';
import LoadingView from '../presentational/LoadingView';

const containerStyle = {
  width: '100%',
  height: '75vh',
};

export default function DrivingForm({ isRider }:{isRider:boolean}) {
  const history = useHistory();
  const [currentPos, setCurrentPos] = useState({ lat: undefined, lng: undefined });
  const [destPos, setDestPos] = useState({ lat: undefined, lng: undefined });
  const [time, setTime] = useState({ startTime: new Date().getTime(), arrivalTime: undefined });
  const { trip }: any = useSelector(selectTripReducer);

  const { data: tripData } = useQuery(GET_ORIGIN_POSITION_AND_DESTINATION_POSITION,
    { variables: { id: trip.id } });

  const { data } = useSubscription(
    LISTEN_MATCHED_DRIVER_STATE,
    { variables: { tripId: trip.id }, skip: !isRider },
  );

  const success = (position: Position): any => {
    const pos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };
    setCurrentPos(pos);
  };

  const navError = (): any => {
    console.log('Error: The Geolocation service failed.');
  };

  const options = {
    enableHighAccuracy: false,
    maximumAge: 0,
  };

  const getCurrentPos = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, navError, options);
      return navigator.geolocation.watchPosition(success, navError, options);
    }
  };

  const distanceMatrixCallback = ({ rows }: any) => {
    if (rows[0].elements[0].status === 'OK') {
      const duration = rows[0].elements[0].duration.value * 1000;
      const arrivalTime = new Date(time.startTime + duration).getTime();
      const difference = arrivalTime - time.arrivalTime;
      if (!time.arrivalTime || difference > 120000 || difference < -120000) {
        setTime({ ...time, arrivalTime: new Date(time.startTime + duration).getTime() });
      }
    }
  };

  useEffect(() => {
    const locationWatch = getCurrentPos();
    return () =>
      navigator.geolocation.clearWatch(locationWatch);
  }, []);

  useEffect(() => {
    if (tripData) {
      setDestPos({ lat: tripData.trip.destination.latitude, lng: tripData.trip.destination.longitude });
    }
  }, [tripData]);

  useEffect(() => {
    if (data && data.matchedDriverState.trip.status === 'close') {
      history.push('/rider/tripend');
    }
  }, [data]);

  return (
    <>
      {currentPos.lat &&
      destPos.lat &&
      <GoogleMap
        mapContainerStyle={containerStyle}
        zoom={16}
        center={currentPos}
        options={{
          zoomControl: true,
          mapTypeControl: false,
          scaleControl: true,
          streetViewControl: true,
          rotateControl: true,
          fullscreenControl: false,
        }}
      >
        <DistanceMatrixService
          callback={distanceMatrixCallback}
          options={{
            origins: [currentPos],
            destinations: [destPos],
            travelMode: google.maps.TravelMode.DRIVING,
            drivingOptions: {
              departureTime: new Date(),
              trafficModel: google.maps.TrafficModel.OPTIMISTIC,
            },
          }}
        />

        <DrivingMap
          car={currentPos}
          destination={destPos}
        />
      </GoogleMap>
      }
      {time.arrivalTime ? isRider ? <TripInfoBox time={time} /> : <RiderInfoBox onBoard={true} currentPos={currentPos}/> : <></>}
    </>
  );
}

