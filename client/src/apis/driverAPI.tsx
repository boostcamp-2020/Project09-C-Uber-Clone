import { driverStateNotifyQuery } from '../queries/driver';

import { ApolloClient } from '@apollo/client';

interface driverPosition {
  lat: number
  lng: number
}

interface driverStateNotifyProps {
  tripId: String
  driverId: String
  riderId: String
  driverPosition: driverPosition
  isDrop: Boolean
}

export const driverStateNotify = async (client: ApolloClient<Object>, driverState: driverStateNotifyProps) => {
  try {
    const { data } = await client.mutate({
      mutation: driverStateNotifyQuery,
      variables: driverState,
      fetchPolicy: 'no-cache',
    });
  } catch (error) {
  }
};
