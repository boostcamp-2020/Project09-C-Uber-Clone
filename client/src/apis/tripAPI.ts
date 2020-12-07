import { ApolloClient } from '@apollo/client';

import { getStatus, pickUpPos, route } from '../queries/trip';
import { setOriginPosition, setDestPosition } from '../slices/mapSlice';

import { OPEN } from '../constants/tripStatus';
import { DRIVER_POPUP, DRIVER_IGNORED } from '../constants/driverStatus';

export const getTripStatus = async (client: ApolloClient<Object>, tripInfo:{id:string}, setDriverStatus:any) => {
  try {
    const { data: { tripStatus } } = await client.query({
      query: getStatus,
      variables: tripInfo,
      fetchPolicy: 'no-cache',
    });
    if (tripStatus === OPEN) {
      setDriverStatus(DRIVER_POPUP);
    } else {
      setDriverStatus(DRIVER_IGNORED);
    }
  } catch (error) {
  }
};

export const getPickUpPos = async (client: ApolloClient<Object>, dispatch:any, tripInfo:{id:string}) => {
  try {
    const { data: { trip } } = await client.query({
      query: pickUpPos,
      variables: tripInfo,
      fetchPolicy: 'no-cache',
    });
  } catch (error) {
  }
};

export const getTripInfo = async (client: ApolloClient<Object>, dispatch:any, tripInfo:{id:string}) => {
  try {
    const { data: { trip } } = await client.query({
      query: route,
      variables: tripInfo,
      fetchPolicy: 'no-cache',
    });
    dispatch(setOriginPosition({ lat: trip.origin.latitude, lng: trip.origin.longitude }));
    dispatch(setDestPosition({ lat: trip.destination.latitude, lng: trip.destination.longitude }));
  } catch (error) {
  }
};
