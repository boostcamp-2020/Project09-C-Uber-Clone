import { Trip } from '../models';

export default {
  create: async (payload) => {
    return await Trip.create(payload);
  },
  findOneStatus: async (id) => {
    return await Trip.findById(id, 'status');
  },
  updateStatus: async(id, status) => {
    return await Trip.findByIdAndUpdate(id, { status });
  },
};
