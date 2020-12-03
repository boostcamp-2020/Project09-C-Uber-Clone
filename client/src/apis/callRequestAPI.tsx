import { driverCall } from '../queries/callRequest';

import { ApolloClient } from '@apollo/client';

interface Position {
  lat: number
  lng: number
}

interface riderPublishInfo {
  riderId: string
  riderEmail: string
  riderName: string
  riderPos: Position
  pickUpPos: Position
  pickUpAddress: string
  destinationPos: Position
  destinationAddress: string
  tripStatus: string
}

export const callRequest = async (
  client: ApolloClient<Object>,
  riderPublishInfo: riderPublishInfo) => {
  try {
    await client.mutate({
      mutation: driverCall,
      variables: { riderPublishInfo: riderPublishInfo },
      fetchPolicy: 'no-cache',
    });
    window.alert('경로 전송');
  } catch (error) {
    window.alert('실패');
    console.log(error);
  }
};
