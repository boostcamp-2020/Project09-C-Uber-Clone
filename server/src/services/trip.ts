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
  estimatedTime: string
  estimatedDistance: string
}

interface SetTripStateArgs {
  tripId: string;
  newTripStatus: string;
}

type Status = 'open' | 'matched' | 'onBoard' | 'close' | 'cancel';

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
      return result;
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
      const trip = await Trip.update(id, { status: 'cancel' });
      return { result: 'canceled', trip };
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
    const { riderEmail, origin, destination, startTime, estimatedTime, estimatedDistance } = args;
    try {
      return await Trip.open(riderEmail, origin, destination, startTime, estimatedTime, estimatedDistance);
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
  getChattings: async (tripId: string) => {
    return await Trip.getChattings(tripId);
  },
  addChatting: async (tripId: string, chatting: {text: string, time: Date, ownerId: string}) => {
    return await Trip.addChatting(tripId, chatting);
  },
  setArrivals: async (tripId: string, arrivalTime: Date, destination: {address: string, latitude: number, longitude: number}) => {
    return await Trip.setArrivals(tripId, arrivalTime, destination);
  },
  getMyTrip: async(userId: string | object, isDriver: boolean, statuses?: Status[]) => {
    return await Trip.getMyTrip(userId, isDriver, statuses);
  },
};
