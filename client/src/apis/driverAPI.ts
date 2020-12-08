import { ADD_DRIVER_POSITION } from '../queries/driver';

import { ApolloClient } from '@apollo/client';

interface driverPosition {
  lat: number
  lng: number
}

export const updateDriverPosition = async (client: ApolloClient<Object>, driverPosition: driverPosition) => {
  try {
    await client.mutate({
      mutation: ADD_DRIVER_POSITION,
      variables: driverPosition,
      fetchPolicy: 'no-cache',
    });
  } catch (error) {
    console.log(error);
  }
};
