import { Trip } from '../repositories';

export default {
  checkTripStatus: async (args) => {
    try {
      const data = await Trip.findOneStatus(args.tripId);
      if (data?.status === 'open') {
        await Trip.updateStatus(args.tripId, 'matched');
        return { tripId: args.tripId, riderId: args.riderId, result: 'success' };
      }
      return { tripId: args.tripId, riderId: args.riderId, result: 'fail' };
    } catch (e) {
      throw e.message;
    }
  },
};
