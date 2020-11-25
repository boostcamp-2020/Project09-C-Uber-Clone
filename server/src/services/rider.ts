import bcrypt from 'bcrypt';

const saltRounds = parseInt(process.env.SALT_ROUNDS || '10');

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
  signup: async (payload) => {
    const { password } = payload;
    try {
      const hash = await bcrypt.hash(password, saltRounds);
      return await Rider.create({ ...payload, password: hash });
    } catch (e) {
      throw e.message;
    }
  },
};
