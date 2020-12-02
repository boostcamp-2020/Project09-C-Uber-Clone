import { driverResponse } from '../queries/driverResponded';

interface Payload {
    response: string
    riderID: string
    tripID: string
}

export const sendDriverResponse = async (client: any, dispatch: any, payload:Payload) => {
  const { data } = await client.mutate({
    mutation: driverResponse,
    variables: payload,
    fetchPolicy: 'no-cache',
  });
};
