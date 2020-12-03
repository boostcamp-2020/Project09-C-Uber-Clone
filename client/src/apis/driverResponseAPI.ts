import { driverResponse, driverResponded } from '../queries/driverResponded';

interface Payload {
    response: string
    riderId: string
    tripId: string
}

export const sendDriverResponse = async (client: any, dispatch: any, payload:Payload) => {
  const { data } = await client.mutate({
    mutation: driverResponse,
    variables: payload,
    fetchPolicy: 'no-cache',
  });
};

export const subscribeDriverResponse = (client:any) => {
  return client
    .subscribe({
      query: driverResponded,
    })
    .subscribe(
      ({ data }:{data:any}) => {
        console.log(data);
      },
      (error:any) => {
        console.log(error);
      },
      (loading:any) => {
        console.log(loading);
      },
    );
};
