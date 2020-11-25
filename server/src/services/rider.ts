import jwt from 'jsonwebtoken' ;

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
};
