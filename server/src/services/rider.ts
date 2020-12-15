import bcrypt from 'bcrypt';

import { Trip } from '../services';
import signToken from '../utils/signToken';
import { Rider } from '../repositories';

const saltRounds = parseInt(process.env.SALT_ROUNDS || '10');

export default {
  login: async (context, payload) => {
    try {
      const { user } = await context.authenticate('rider-local', payload);
      const token = signToken({ email: user.email, isDriver: false });
      const trip = user ? await Trip.getMyTrip(user._id, false, ['open', 'matched', 'onBoard']) : undefined ;
      return { success: true, token, user: { role: 'rider', tripId: trip?._id } };
    } catch (e) {
      return { success: false, message: e.message };
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
  getRiderInfo: async (payload) => {
    try {
      return await Rider.findByEmail(payload);
    } catch (e) {
      throw e.message;
    }
  },
};
