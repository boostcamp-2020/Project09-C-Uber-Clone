import { setTrip } from '../slices/tripSlice';
import { cancelCall } from '../queries/trip';

interface Payload {
    tripId: string
}

export const requestCancelCall = async (client: any, history: any, dispatch:any, payload:Payload) => {
  const { data: { cancelTrip } } = await client.mutate({
    mutation: cancelCall,
    variables: { id: payload.tripId },
    fetchPolicy: 'no-cache',
  });
  if (cancelTrip.result === 'canceled') {
    //TODO: 전역으로 관리되는 경로 정보 초기화
    window.alert('호출이 취소되었습니다.');
    dispatch(setTrip({ id: '' }));
    history.push('/rider/setcourse');
  }
};
