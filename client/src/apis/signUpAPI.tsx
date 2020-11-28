import { signUpDriver, signUpRider } from '../queries/signup';

interface RiderInfo {
  name: string;
  phoneNumber: string;
  email: string;
  password: string;
}

export const requestRiderSignUp = async(client: any, history: any, riderInfo: RiderInfo) => {
  const { data } = await client.mutate({
    mutation: signUpRider,
    variables: { ...riderInfo },
    fetchPolicy: 'no-cache',
  });
  if (data) {
    history.push('/login');
  }
  window.alert('회원가입 실패');
  history.push('/signup/rider') ;
};
