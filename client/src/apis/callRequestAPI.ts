import { NOTIFY_RIDER_CALL } from '../queries/callRequest';

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
      mutation: NOTIFY_RIDER_CALL,
      variables: payload,
      fetchPolicy: 'no-cache',
    });
    if (driverCall) {
      dispatch(setTrip({ id: driverCall }));
      history.push('/rider/waiting');
    }
  } catch (error) {
    window.alert('호출에 실패했습니다');
    console.log(error);
  }
};
