import jwt from 'jsonwebtoken' ;
import bcrypt from 'bcrypt';

const saltRounds = parseInt(process.env.SALT_ROUNDS || '10');

import { Rider } from '../repositories';

export default {
  login: async (context, payload) => {
    try {
      const { user } = await context.authenticate('rider-local', payload);
      const token = jwt.sign({
        email: user?.email,
        isDriver: false,
      },
      process.env.JWT_SECRET_KEY || '',
      {
        expiresIn: '5m',
      });
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
};
