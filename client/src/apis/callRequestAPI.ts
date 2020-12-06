import { sendDriverCall } from '../queries/callRequest';

import { ApolloClient } from '@apollo/client';

interface TripPlace {
  address: string
  latitude: number
  longitude: number
}

interface riderPublishInfo {
  origin: TripPlace
  destination: TripPlace
  startTime: string
  distance?:number
}

export const callRequest = async (client: ApolloClient<Object>, history:any, payload: riderPublishInfo) => {
  console.log(payload);
  try {
    const { data: { driverCall } } = await client.mutate({
      mutation: sendDriverCall,
      variables: payload,
      fetchPolicy: 'no-cache',
    });
    window.alert('경로 전송');
    //TODO: sessionStorage 대신 redux로 관리
    if (driverCall) {
      sessionStorage.setItem('tripId', driverCall);
      history.push('/rider/waiting');
    }
  } catch (error) {
    window.alert('실패');
    console.log(error);
  }
};
