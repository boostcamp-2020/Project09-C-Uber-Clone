import 'dotenv/config';
import bcrypt from 'bcrypt';
import { Driver } from '../repositories';

const saltRounds = parseInt(process.env.SALT_ROUNDS || '10');

export default {
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
