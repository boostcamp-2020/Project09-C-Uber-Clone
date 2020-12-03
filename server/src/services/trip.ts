import { Trip } from '../repositories';
import { DRIVER_RESPONDED } from '../graphql/subscriptions';
export default {
  sendDriverResponse: async (args, context) => {
    try {
      const driverId = context.req.user.data._id;
      const data = await Trip.findOneStatus(args.tripId);
      if (data?.status === 'open') {
        await Trip.updateStatus(args.tripId, 'matched');
        context.pubsub.publish('DRIVER_RESPONDED', { driverResponded: { driverId, ...args } });
        return { tripId: args.tripId, riderId: args.riderId, result: 'success' };
      }
      return { tripId: args.tripId, riderId: args.riderId, result: 'fail' };
    } catch (e) {
      throw e.message;
    }
  },
};
