import { signUpDriver, signUpRider } from '../queries/signup';

interface RiderInfo {
  name: string;
  phoneNumber: string;
  email: string;
  password: string;
}

interface DriverInfo {
  name: string;
  phoneNumber: string;
  email: string;
  password: string;
  carType: string;
  plateNumber: string;
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

export const requestDriverSignUp = async(client: any, history: any, driverInfo: DriverInfo) => {
  const { data } = await client.mutate({
    mutation: signUpDriver,
    variables: { ...driverInfo },
    fetchPolicy: 'no-cache',
  });
  if (data.createRider) {
    history.push('/login');
  }
  window.alert('회원가입 실패');
  history.push('/signup/driver') ;
};
