import { driverCall } from '../queries/callRequest';

export const callRequest = async (client: any, driverIds: any, riderId: any, origin : any, destination: any) => {
  const { data } = await client.mutate({
    mutation: driverCall,
    variables: { driverIds, riderId, origin, destination },
    fetchPolicy: 'no-cache',
  });
};
