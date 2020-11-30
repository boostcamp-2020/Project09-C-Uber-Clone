import { verifyQuery } from '../queries/verify';

import { setLoginRole } from '../slices/loginSlice';

export const verifyUser = async (client: any, dispatch: any) => {
  const { data } = await client.mutate({
    mutation: verifyQuery,
    fetchPolicy: 'no-cache',
  });

  !!data.verifyUser.role ? dispatch(setLoginRole(data.verifyUser.role)) : dispatch(setLoginRole('null'));
};
