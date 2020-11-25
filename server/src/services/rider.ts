import { Rider } from '../repositories';

export default {
  login: async (context, payload) => {
    try {
      const { user } = await context.authenticate('rider-local', payload);
      //TODO: jwt 발급 후 반환
      return user._id;
    } catch (e) {
      return e.message;
    }
  },
};
