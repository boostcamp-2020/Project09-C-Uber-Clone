import { Driver } from '../models';

export default {
  create: async (payload) => {
    const newDriver = await Driver.create(payload);
    return newDriver;
  },
  findAll: async () => {
    const drivers = await Driver.find({});
    return drivers;
  },
};
