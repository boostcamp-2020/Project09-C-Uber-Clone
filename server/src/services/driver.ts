import bcrypt from 'bcrypt';

import { Trip } from '../services';
import { Driver } from '../repositories';
import signToken from '../utils/signToken';

const saltRounds = parseInt(process.env.SALT_ROUNDS || '10');

export default {
  login: async (context, payload) => {
    try {
      const { user } = await context.authenticate('driver-local', payload);
      const token = signToken({ email: user.email, isDriver: true });
      const trip = user ? await Trip.getMyTrip(user._id, true, ['matched', 'onBoard']) : undefined ;
      return { success: true, token, user: { role: 'driver', tripId: trip?._id } };;
    } catch (e) {
      return { success: false, message: e.message, role: 'unknown' };
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
      return await Driver.findAllByRadius(payload);
    } catch (e) {
      throw e.message;
    }
  },
  updateDriverPosition: async(payload) => {
    try {
      return await Driver.updatePosition(payload);
    } catch (e) {
      throw e.message;
    }
  },
};
