import bcrypt from 'bcrypt';

import { Driver } from '../repositories';
import signToken from '../utils/signToken';

const saltRounds = parseInt(process.env.SALT_ROUNDS || '10');

export default {
  login: async (context, payload) => {
    try {
      const { user } = await context.authenticate('driver-local', payload);
      const token = signToken({ email: user.email, isDriver: true });
      return { success: true, name: user.name, role: 'driver', token };;
    } catch (e) {
      return { success: false, message: e.message, role: 'driver' };
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
  getDriverList: async (payload) => {
    try {
      return await Driver.findAllByDistance(payload);
    } catch (e) {
      throw e.message;
    }
  },

};
