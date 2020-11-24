import { Rider } from '../repositories';

export default {
  login: async (payload) => {
    const rider = await Rider.findByEmailPassword(payload);
    if (rider) {
      return 'token';
    };
    return 'unauthorized';
  },
};
