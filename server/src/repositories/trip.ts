import { Trip } from '../models';

export default {
  findOneStatus: async (id) => {
    return await Trip.findById(id, 'status');
  },
  update: async(id, payload) => {
    return await Trip.findByIdAndUpdate(id, payload);
  },
};
