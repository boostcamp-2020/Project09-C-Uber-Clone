import { Driver } from '../models';

export default {
  create: async (payload) => {
    return await Driver.create(payload);
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
};
