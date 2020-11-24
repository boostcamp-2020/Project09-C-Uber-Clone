import { Rider } from '../models';

export default {
  create: async (payload) => {
    const newRider = await Rider.create(payload);
    return newRider;
  },
  findAll: async () => {
    const riders = await Rider.find({});
    return riders;
  },
};
