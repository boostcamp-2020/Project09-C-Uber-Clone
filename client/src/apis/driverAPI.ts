import { driverStateNotifyQuery, updateDriverPosQuery } from '../queries/driver';

import { ApolloClient } from '@apollo/client';

interface driverPosition {
  lat: number
  lng: number
}

interface driverStateNotifyProps {
  tripId: String
  driverPosition: driverPosition
  isDrop: Boolean
}

export const driverStateNotify = async (client: ApolloClient<Object>, driverState: driverStateNotifyProps) => {
  try {
    await client.mutate({
      mutation: driverStateNotifyQuery,
      variables: driverState,
      fetchPolicy: 'no-cache',
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateDriverPosition = async (client: ApolloClient<Object>, driverPosition: driverPosition) => {
  try {
    await client.mutate({
      mutation: updateDriverPosQuery,
      variables: { driverPosition },
      fetchPolicy: 'no-cache',
    });
  } catch (error) {
    console.log(error);
  }
};
