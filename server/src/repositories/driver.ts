import { Driver } from '../models';

export default {
  create: async (payload) => {
    return await Driver.create(payload);
  },
  findAll: async () => {
    return await Driver.find({});
  },
};
