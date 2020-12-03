import { Trip } from '../../services';

interface cancelPayload{
    id:string
}

export default {
  Mutation: {
    async cancelTrip(_: any, payload:cancelPayload, context) {
      return await Trip.cancelTrip(payload);
    },
  },
};
