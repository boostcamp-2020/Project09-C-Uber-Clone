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
  findAllByDistance: async({ lat, lng, distance }:{lat:number, lng:number, distance: number}) => {
    const latitude = { $gte: lat - distance, $lte: lat + distance };
    const longitude = { $gte: lng - distance, $lte: lng + distance };
    return await Driver.find({ latitude, longitude }, '_id');
  },
};
