import { Trip } from '../../services';

interface ID{
    id:string
}

export default {
  Query: {
    async tripStatus(_:any, args:ID) {
      return await Trip.getStatus(args);
    },
  },
  Mutation: {
    async cancelTrip(_: any, args:ID) {
      return await Trip.cancel(args);
    },
  },
};
