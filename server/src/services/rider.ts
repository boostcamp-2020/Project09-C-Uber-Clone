import jwt from 'jsonwebtoken' ;
import bcrypt from 'bcrypt';

import signToken from '../utils/signToken';

const saltRounds = parseInt(process.env.SALT_ROUNDS || '10');

import { Rider } from '../repositories';

export default {
  login: async (context, payload) => {
    try {
      const { user } = await context.authenticate('rider-local', payload);
      const token = signToken({ email: user.email, isDriver: false });
      return { success: true, name: user.name, role: 'rider', token: token };
    } catch (e) {
      return { success: false, message: e.message, role: 'rider' };
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
