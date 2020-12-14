import { Trip, Rider } from '../models';

interface PlaceInterface {
  address: string;
  latitude: number;
  longitude: number;
}

type Status = 'open' | 'matched' | 'onBoard' | 'close' | 'cancel';

export default {
  findById: async(id:string) => {
    return await Trip.findById(id);
  },
  create: async (payload) => {
    return await Trip.create(payload);
  },
  findOneStatus: async (id) => {
    return await Trip.findById(id, 'status');
  },
  update: async(id, payload) => {
    return await Trip.findByIdAndUpdate(id, payload, { new: true });
  },
  open: async (
    riderEmail: string,
    origin: PlaceInterface,
    destination: PlaceInterface,
    startTime: Date,
    estimatedTime: string,
    estimatedDistance: string) => {
    const fields = '_id email name';
    const rider = await Rider.findOne({ email: riderEmail }, fields).exec();
    if (rider) {
      return await Trip.create({ rider, origin, destination, startTime, estimatedTime, estimatedDistance, status: 'open' });
    }
    return null;
  },
  setStatus: async (tripId, newTripStatus) => {
    const trip = await Trip.findOneAndUpdate({ _id: tripId }, { status: newTripStatus }, { new: true });
    return trip;
  },
  getChattings: async (tripId: string) => {
    const trip = await Trip.findOne({ _id: tripId }, 'chattings');
    return trip?.chattings;
  },
  addChatting: async (tripId: string, chatting: {text: string, time: Date, ownerId: string}) => {
    const trip = await Trip.findOneAndUpdate({ _id: tripId }, { $push: { chattings: chatting } }, { new: true });
    if (trip?.chattings) {
      return trip?.chattings[trip?.chattings?.length - 1];
    }
  },
  setArrivals: async (tripId: string, realArrivalTime: Date, realDestination: {address: string, latitude:number, longitude: number}) => {
    return await Trip.findOneAndUpdate({ _id: tripId }, { arrivalTime: realArrivalTime, destination: realDestination }, { new: true });
  },
  getMyTrip: async (userId: string | object, isDriver: boolean, statuses?: Status[]) => {
    if (isDriver) {
      return await Trip.findOne({ status: { $in: statuses }, 'driver._id': userId });
    } else {
      return await Trip.findOne({ status: { $in: statuses }, 'rider._id': userId });
    }
  },
};
