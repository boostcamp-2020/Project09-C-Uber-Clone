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
    await client.mutate({
      mutation: signUpRider,
      variables: { ...riderInfo },
      fetchPolicy: 'no-cache',
    });
    window.alert('회원가입 성공');
    history.push('/login');
  } catch (error) {
    window.alert(`회원가입 실패\n원인${error}`);
  }
};

export const requestDriverSignUp = async(client: any, history: any, driverInfo: DriverInfo) => {
  try {
    await client.mutate({
      mutation: signUpDriver,
      variables: { ...driverInfo },
      fetchPolicy: 'no-cache',
    });
    window.alert('회원가입 성공');
    history.push('/login');
  } catch (error) {
    window.alert(`회원가입 실패\n원인${error}`);
  }
};
