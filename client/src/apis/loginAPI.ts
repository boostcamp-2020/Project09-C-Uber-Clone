import { ApolloClient } from '@apollo/client';

import { loginRiderQuery, loginDriverQuery } from '../queries/login';

import { setLoginRole } from '../slices/loginSlice';

export const requestLogin = async (client: ApolloClient<object>, history: any, riderCheck : boolean, email: string, password: string, dispatch: any) => {
  const { data } = await client.mutate({
    mutation: riderCheck ? loginRiderQuery : loginDriverQuery,
    variables: { email, password },
    fetchPolicy: 'no-cache',
  });

  const { message, name, role, success, token } = riderCheck ? data.loginRider : data.loginDriver;

  if (success) {
    localStorage.setItem('token', token);
    dispatch(setLoginRole(role));
    riderCheck ? history.push('/setcourse') : history.push('/driver/main');
  } else {
    window.alert(message);
  }
};
