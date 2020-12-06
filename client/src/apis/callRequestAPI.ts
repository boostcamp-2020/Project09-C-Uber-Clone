import { sendDriverCall } from '../queries/callRequest';

import { ApolloClient } from '@apollo/client';
import { setTrip } from '../slices/tripSlice';

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

export const callRequest = async (client: ApolloClient<Object>, history:any, dispatch: any, payload: riderPublishInfo) => {
  try {
    const { data: { driverCall } } = await client.mutate({
      mutation: sendDriverCall,
      variables: payload,
      fetchPolicy: 'no-cache',
    });
    window.alert('경로 전송');
    if (driverCall) {
      dispatch(setTrip({ id: driverCall }));
      history.push('/rider/waiting');
    }
  } catch (error) {
    window.alert('실패');
    console.log(error);
  }
};
