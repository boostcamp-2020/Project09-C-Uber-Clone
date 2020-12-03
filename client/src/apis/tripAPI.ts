import { ApolloClient } from '@apollo/client';

import { getStatus } from '../queries/trip';

export const getTripStatus = async (client: ApolloClient<Object>, tripInfo:{id:string}) => {
  try {
    const { data } = await client.query({
      query: getStatus,
      variables: tripInfo,
      fetchPolicy: 'no-cache',
    });
    console.log(data);
  } catch (error) {
  }
};
