import { driverStateNotifyQuery } from '../queries/driver';

interface driverStateNotifyProps {
  operationId: String
  driverId: String
  riderId: String
  driverPosition: String
  isDrop: Boolean
}

export const driverStateNotify = async (client: any, driverState: driverStateNotifyProps) => {
  const { data } = await client.mutate({
    mutation: driverStateNotifyQuery,
    variables: driverState,
    fetchPolicy: 'no-cache',
  });
};
