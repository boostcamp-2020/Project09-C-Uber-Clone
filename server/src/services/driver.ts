import 'dotenv/config';
import bcrypt from 'bcrypt';
import { Driver } from '../repositories';

const saltRounds = parseInt(process.env.SALT_ROUNDS || '10');

export default {
  login: async (context, payload) => {
    try {
      const { user } = await context.authenticate('driver-local', payload);
      //TODO: jwt 발급 후 반환
      return user._id;
    } catch (e) {
      return e.message;
    }
  },
  signup: async (payload) => {
    const { password } = payload;
    try {
      const hash = await bcrypt.hash(password, saltRounds);
      return await Driver.create({ ...payload, password: hash });
    } catch (e) {
      throw e.message;
    }
  },
  getDriverInfo: async (payload) => {
    try {
      return await Driver.findByEmail(payload);
    } catch (e) {
      throw e.message;
    }
  },
};
