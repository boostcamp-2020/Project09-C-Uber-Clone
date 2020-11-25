import bcrypt from 'bcrypt';
import passport from 'passport';
import { GraphQLLocalStrategy } from 'graphql-passport';

import { Rider, Driver } from '../repositories';

export const localStrategy = () => {
  passport.use('driver-local',
    new GraphQLLocalStrategy(async(email, inputPassword, done) => {
      const user = await Driver.findByEmail({ email }) ;
      const passwordCompareResult = await bcrypt.compare(inputPassword, user?.password);
      const error = passwordCompareResult ? null : new Error('no matching user');
      done(error, user);
    }),
  );

  passport.use('rider-local',
    new GraphQLLocalStrategy(async(email, inputPassword, done) => {
      const user = await Rider.findByEmail({ email });
      const passwordCompareResult = await bcrypt.compare(inputPassword, user?.password);
      const error = passwordCompareResult ? null : new Error('no matching user');
      done(error, user);
    }),
  );
};
