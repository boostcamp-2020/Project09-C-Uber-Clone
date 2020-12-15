import { Trip } from '../../services';

export default {
  Query: {
    async user(parent: any, args:any, context: any, info: any) {
      const { data } = context.req.user;
      return data;
    },
    async verifyUser(parent: any, args: {}, context: any, info: any) {
      const user = context.getUser();
      const trip = user ? await Trip.getMyTrip(user.data._id, user.isDriver, ['open', 'matched', 'onBoard']) : undefined ;
      return { role: context.req.user ? context.req.user.isDriver ? 'driver' : 'rider' : 'unknown', tripId: trip?._id };
    },
  },
};
