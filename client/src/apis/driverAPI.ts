import { ApolloClient } from '@apollo/client';

import { matchedRiderStateQuery } from '../queries/rider';

const subscribeMatchedRiderState = (client: ApolloClient<object>, tripId: string) => {
  try {
    client.subscribe({
      query: matchedRiderStateQuery,
      variables: { tripId },
    });
    console.log('subcribe');
  } catch (err) {
    throw err;
  }
};

export { subscribeMatchedRiderState };
