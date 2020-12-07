import { Trip, Driver } from '../repositories';

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

interface SetTripStateArgs {
  tripId: string;
  newTripStatus: string;
}

export default {
  get: async({ id }) => {
    try {
      return await Trip.findById(id);
    } catch (e) {
      throw e.message;
    }
  },
  getStatus: async({ id }) => {
    try {
      const result = await Trip.findOneStatus(id);
      return result?.status;
    } catch (e) {
      throw e.message;
    }
  },
  create: async (payload) => {
    try {
      return await Trip.create({ ...payload });
    } catch (e) {
      throw e.message;
    }
  },
  checkStatus: async (args) => {
    try {
      const data = await Trip.findOneStatus(args.tripId);
      if (data?.status === 'open') {
        return 'success' ;
      }
      return data?.status;
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
  openTrip: async (args: OpenArgs) => {
    const { riderEmail, origin, destination, startTime, distance } = args;
    try {
      return await Trip.open(riderEmail, origin, destination, startTime, distance);
    } catch (e) {
      throw e;
    }
  },
  setStatus: async (args: SetTripStateArgs) => {
    try {
      const { tripId, newTripStatus } = args;
      return await Trip.setStatus(tripId, newTripStatus);
    } catch (e) {
      throw e;
    }
  },
};
