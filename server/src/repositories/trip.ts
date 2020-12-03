import { Trip } from '../models';

export default {
  create: async (payload) => {
    return await Trip.create(payload);
  },
};
