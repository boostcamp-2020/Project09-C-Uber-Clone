import { Trip } from '../repositories';

export default {
  create: async (payload) => {
    try {
      return await Trip.create({ ...payload });
    } catch (e) {
      throw e.message;
    }
  },
};
