import { ApolloClient } from '@apollo/client';


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

export const setTripStatus = async (client: ApolloClient<Object>, tripId: string, newTripStatus: string) => {
  try {
    await client.mutate({
      mutation: setTripStateQuery,
      variables: { tripId, newTripStatus },
      fetchPolicy: 'no-cache',
    });

  } catch (error) {
    console.log(error);
  }
};
