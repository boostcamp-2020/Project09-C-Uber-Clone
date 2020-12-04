import { driverResponse, driverResponded } from '../queries/driverResponded';
import { getPickUpPos } from '../apis/tripAPI';

import { MATCHING_CONFIRM } from '../constants/matchingResult';

interface Payload {
    response: string
    riderId: string
    tripId: string
}

export const sendDriverResponse = async (client: any, dispatch: any, payload:Payload) => {
  const { data: { sendResponse } } = await client.mutate({
    mutation: driverResponse,
    variables: payload,
    fetchPolicy: 'no-cache',
  });
  return sendResponse;
};

export const subscribeDriverResponse = (client:any, history:any) => {
  return client
    .subscribe({
      query: driverResponded,
    })
    .subscribe(
      async({ data: { driverResponded } }:{data:any}) => {
        const { response, driverId, tripId } = driverResponded;
        if (response === MATCHING_CONFIRM) {
          //TODO: sessionStorage 대신 리덕스로 관리
          sessionStorage.setItem('tripId', tripId);
          sessionStorage.setItem('driverId', driverId);
          await getPickUpPos(client, { id: tripId });
          history.push('/rider/pickup');
        }
      },
      (error:any) => {
        console.log(error);
      },
      (loading:any) => {
        console.log(loading);
      },
    );
};
