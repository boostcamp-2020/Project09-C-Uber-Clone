import { Driver } from '../models';

export default {
  create: async (payload) => {
    return await Driver.create(payload);
  },
  findAll: async () => {
    return await Driver.find({});
  },
  findByEmail: async (payload: {email: string}) => {
    return await Driver.findOne({ email: payload.email });
  },
  findByEmailPassword: async(payload) => {
    return await Driver.findOne(payload);
  },
};
