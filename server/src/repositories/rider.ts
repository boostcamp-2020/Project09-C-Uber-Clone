import { Rider } from '../models';

export default {
  create: async (payload) => {
    return await Rider.create(payload);
  },
  findAll: async () => {
    return await Rider.find({});
  },
  findByEmail: async (payload: {email: string}) => {
    return await Rider.findOne({ email: payload.email });
  },
};
