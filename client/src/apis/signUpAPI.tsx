import { signUpDriver, signUpRider } from '../queries/signup';

interface RiderInfo {
  name: string;
  phoneNumber: string;
  email: string;
  password: string;
}

export const requestRiderSignUp = async(client: any, history: any, riderInfo: RiderInfo) => {
  try {
    const { data } = await client.mutate({
      mutation: signUpRider,
      variables: { ...riderInfo },
      fetchPolicy: 'no-cache',
    });
    if (data) {
      return history.push('/login');
    }
  } catch (error) {
    console.log(error);
    window.alert(`회원가입 실패\n원인${error}`);
    history.push('/signup/rider') ;
  }
};
