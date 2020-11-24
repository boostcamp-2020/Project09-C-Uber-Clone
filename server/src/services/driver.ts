import 'dotenv/config';
import bcrypt from 'bcrypt';
import { Driver } from '../repositories';

const saltRounds = parseInt(process.env.SALT_ROUNDS || '10');

export default {
  signup: async (payload) => {
    const { password } = payload;
    try {
      const hash = await bcrypt.hash(password, saltRounds);
      const driver = await Driver.create({ ...payload, password: hash });
      return driver;
    } catch (e) {
      throw e.message;
    }
  },
  getDriverInfo: async (payload) => {
    try {
      const driver = await Driver.findByEmail(payload);
      return driver;
    } catch (e) {
      throw e.message;
    }
  },
};
