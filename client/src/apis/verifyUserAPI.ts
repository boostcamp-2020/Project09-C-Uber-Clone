import { ApolloClient } from '@apollo/client';

import { VERIFY_USER_ROLE } from '../queries/verify';

import { setLoginRole } from '../slices/loginSlice';

export const verifyUser = async (client: ApolloClient<object>, dispatch: any) => {
  const { data } = await client.mutate({
    mutation: VERIFY_USER_ROLE,
    fetchPolicy: 'no-cache',
  });

  !!data.verifyUser.role ? dispatch(setLoginRole(data.verifyUser.role)) : dispatch(setLoginRole('unknown'));
};
