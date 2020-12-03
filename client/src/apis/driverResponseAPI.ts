import { driverResponse, driverResponded } from '../queries/driverResponded';

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
      ({ data: { driverResponded } }:{data:any}) => {
        const { response, driverId, tripId } = driverResponded;
        if (response === MATCHING_CONFIRM) {
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
