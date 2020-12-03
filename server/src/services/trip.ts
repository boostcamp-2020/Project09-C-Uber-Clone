import { Trip, Driver } from '../repositories';

export default {
  getStatus: async({ id }) => {
    try {
      const result = await Trip.findOneStatus(id);
      return result?.status;
    } catch (e) {
      throw e.message;
    }
  },
  checkStatus: async (args) => {
    try {
      const data = await Trip.findOneStatus(args.tripId);
      if (data?.status === 'open') {
        return { tripId: args.tripId, riderId: args.riderId, result: 'success' };
      }
      return { tripId: args.tripId, riderId: args.riderId, result: data?.status };
    } catch (e) {
      throw e.message;
    }
  },
  cancel: async ({ id }) => {
    try {
      await Trip.update(id, { status: 'cancel' });
      return { id, result: 'canceled' };
    } catch (e) {
      throw e.message;
    }
  },
  setMatchedDriver: async ({ driverId, tripId }) => {
    try {
      const driver = await Driver.findById({ id: driverId });
      return await Trip.update(tripId, { status: 'matched', driver });
    } catch (e) {
      throw e.message;
    }
  },
};
