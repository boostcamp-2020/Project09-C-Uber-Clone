import { Trip } from '../../services';

interface cancelPayload{
    id:string
}

export default {
  Mutation: {
    async cancelTrip(_: any, payload:cancelPayload) {
      return await Trip.cancel(payload);
    },
  },
};
