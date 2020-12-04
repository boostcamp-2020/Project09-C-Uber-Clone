import { ApolloClient } from '@apollo/client';

import { getStatus, pickUpPos } from '../queries/trip';

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

export const getPickUpPos = async (client: ApolloClient<Object>, tripInfo:{id:string}) => {
  try {
    const { data: { trip } } = await client.query({
      query: pickUpPos,
      variables: tripInfo,
      fetchPolicy: 'no-cache',
    });
    //TODO: trip정보 전체를 전역으로 관리(redux)
    sessionStorage.setItem('lat', trip.origin.latitude);
    sessionStorage.setItem('lng', trip.origin.longitude);
  } catch (error) {
  }
};
