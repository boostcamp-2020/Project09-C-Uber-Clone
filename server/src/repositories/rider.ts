import { Rider } from '../models';

export default {
  create: async (payload) => {
    return await Rider.create(payload);
  },
  findAll: async () => {
    return await Rider.find({});
  },
  findByEmailPassword: async(payload) => {
    return await Rider.findOne(payload);
  },
};
