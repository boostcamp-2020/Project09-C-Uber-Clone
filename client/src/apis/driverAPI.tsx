import { driverStateNotifyQuery } from '../queries/driver';

interface driverPosition {
  lat: number
  lng: number
}

interface driverStateNotifyProps {
  operationId: String
  driverId: String
  riderId: String
  driverPosition: driverPosition
  isDrop: Boolean
}

export const driverStateNotify = async (client: any, driverState: driverStateNotifyProps) => {
  try {
    const { data } = await client.mutate({
      mutation: driverStateNotifyQuery,
      variables: driverState,
      fetchPolicy: 'no-cache',
    });
  } catch (error) {
  }
};
