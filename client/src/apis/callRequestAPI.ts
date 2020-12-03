import { driverCall } from '../queries/callRequest';

import { ApolloClient } from '@apollo/client';

interface Position {
  lat: number;
  lng: number;
}

export const callRequest = async (client: ApolloClient<Object>, driverIds: string[], riderId: string, origin : Position, destination: Position) => {
  try {
    await client.mutate({
      mutation: driverCall,
      variables: { driverIds, riderId, origin, destination },
      fetchPolicy: 'no-cache',
    });
    window.alert('경로 전송');
  } catch (error) {
    window.alert('실패');
    console.log(error);
  }
};
