import { NOTIFY_DRIVER_RESPONSE, driverResponded } from '../queries/driverResponded';
import { getPickUpPos } from '../apis/tripAPI';

import { MATCHING_CONFIRM } from '../constants/matchingResult';
import { setDriver, setTrip } from '../slices/tripSlice';

interface Payload {
  response: string
  riderId: string
  tripId: string
}

export const sendDriverResponse = async (client: any, dispatch: any, payload:Payload) => {
  const { data: { sendResponse } } = await client.mutate({
    mutation: NOTIFY_DRIVER_RESPONSE,
    variables: payload,
    fetchPolicy: 'no-cache',
  });
  return sendResponse;
};

export const subscribeDriverResponse = (client:any, history:any, dispatch:any) => {
  return client
    .subscribe({
      query: driverResponded,
    })
    .subscribe(
      async({ data: { driverResponded } }:{data:any}) => {
        const { response, driverId, tripId } = driverResponded;
        if (response === MATCHING_CONFIRM) {
          dispatch(setTrip({ id: tripId }));
          dispatch(setDriver({ id: driverId }));
          await getPickUpPos(client, dispatch, { id: tripId });
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
