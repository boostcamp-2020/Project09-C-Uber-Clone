interface TokenInterface {
    email: string;
    isDriver: boolean;
}

import { AuthenticationError } from 'apollo-server-express';
import jwt from 'jsonwebtoken';
import { Rider, Driver } from '../repositories/index';

export default async(token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY || '');
    const isDriver = (decoded as TokenInterface).isDriver;
    const email = (decoded as TokenInterface).email;
    const data = isDriver ? await Driver.findByEmail({ email }) : await Rider.findByEmail({ email });
    return { data, isDriver };
  } catch (err) {
    throw new AuthenticationError('No Authorized');
  }
};
