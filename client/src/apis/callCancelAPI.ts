import { cancelCall } from '../queries/trip';

interface Payload {
    tripId: string
}

export const requestCancelCall = async (client: any, history: any, payload:Payload) => {
  const { data: { cancelTrip } } = await client.mutate({
    mutation: cancelCall,
    variables: { id: payload.tripId },
    fetchPolicy: 'no-cache',
  });
  console.log(cancelTrip);
  if (cancelTrip.result === 'canceled') {
    //TODO: 전역으로 관리되는 trip id 도 삭제
    window.alert('호출이 취소되었습니다.');
    history.push('/rider/setcourse');
  }
};
