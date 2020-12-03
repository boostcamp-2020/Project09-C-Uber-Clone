import { Trip } from '../repositories';

interface PlaceInterface {
  address: string;
  latitude: number;
  longitude: number;
}

interface OpenArgs {
  riderEmail: string;
  origin: PlaceInterface;
  destination: PlaceInterface;
  startTime: Date;
  distance?: number;
}

export default {
  create: async (payload) => {
    try {
      return await Trip.create({ ...payload });
    } catch (e) {
      throw e.message;
    }
  },
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
  openTrip: async (args: OpenArgs) => {
    const { riderEmail, origin, destination, startTime, distance } = args;
    try {
      return await Trip.open(riderEmail, origin, destination, startTime, distance);
    } catch (e) {
      throw e;
    }
  },
};
