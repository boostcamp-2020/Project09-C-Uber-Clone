import { loginRiderQuery, loginDriverQuery } from '../queries/login';

export const requestLogin = async (client: any, history: any, riderCheck : boolean, email: string, password: string) => {
  const { data } = await client.mutate({
    mutation: riderCheck ? loginRiderQuery : loginDriverQuery,
    variables: { email, password },
    fetchPolicy: 'no-cache',
  });

  const { message, name, role, success, token } = riderCheck ? data.loginRider : data.loginDriver;

  if (success) {
    localStorage.setItem('token', token);
    riderCheck ? history.push('/setcourse') : history.push('/driver/main');
  } else {
    window.alert(message);
  }
};
