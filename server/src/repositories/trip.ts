import { Trip, Rider } from '../models';

interface PlaceInterface {
  address: string;
  latitude: number;
  longitude: number;
}

export default {
  findById: async(id) => {
    return await Trip.findById(id);
  },
  create: async (payload) => {
    return await Trip.create(payload);
  },
  findOneStatus: async (id) => {
    return await Trip.findById(id, 'status');
  },
  update: async(id, payload) => {
    return await Trip.findByIdAndUpdate(id, payload);
  },
  open: async (
    riderEmail: string,
    origin: PlaceInterface,
    destination: PlaceInterface,
    startTime: Date,
    distance?: number) => {
    const fields = '_id email name';
    const rider = await Rider.findOne({ email: riderEmail }, fields).exec();
    if (rider) {
      return await Trip.create({ rider, origin, destination, startTime, distance, status: 'open' });
    }
    return null;
  },
  setStatus: async (tripId, newTripStatus) => {
    return await Trip.updateOne({ _id: tripId }, { status: newTripStatus });
  },
  getChattings: async (tripId: string) => {
    const trip = await Trip.findOne({ _id: tripId }, 'chattings');
    return trip?.chattings;
  },
  addChatting: async (tripId: string, chatting: {text: string, time: Date, userId: string}) => {
    const trip = await Trip.findOneAndUpdate({ _id: tripId }, { $push: { chattings: chatting } });
    return trip?.chattings;
  },
};
