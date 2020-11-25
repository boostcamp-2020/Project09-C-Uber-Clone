import { Rider } from '../repositories';

export default {
  login: async (context, payload) => {
    try {
      const { user } = await context.authenticate('graphql-local', payload);
      return user._id;
    } catch (e) {
      return e.message;
    }
  },
};
