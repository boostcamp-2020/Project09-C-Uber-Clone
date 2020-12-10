import { Driver } from '../models';

export default {
  create: async (payload) => {
    return await Driver.create(payload);
  },
  updatePosition: async({ driverId, lat, lng }) => {
    return await Driver.updateOne({ _id: driverId }, { latitude: lat, longitude: lng });
  },
  findAll: async () => {
    return await Driver.find({});
  },
  findByEmail: async ({ email }: {email: string}) => {
    return await Driver.findOne({ email });
  },
  findById: async ({ id }:{id: string}) => {
    return await Driver.findById(id);
  },
  findAllByRadius: async({ lat, lng, callRadius }:{lat:number, lng:number, callRadius: number}) => {
    const latitude = { $gte: lat - callRadius, $lte: lat + callRadius };
    const longitude = { $gte: lng - callRadius, $lte: lng + callRadius };
    return await Driver.find({ latitude, longitude }, '_id');
  },
};
