interface TokenInterface {
    email: string;
    isDriver: boolean;
}

import { AuthenticationError } from 'apollo-server-express';
import jwt from 'jsonwebtoken';
import { Rider, Driver } from '../repositories/index';

export default async (token:string) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY || '');
    const { isDriver, email } = decoded as TokenInterface;
    const data = isDriver ? await Driver.findByEmail({ email }) : await Rider.findByEmail({ email });
    return { data, isDriver };
  } catch (err) {
    throw new AuthenticationError('No Authorized');
  }
};
