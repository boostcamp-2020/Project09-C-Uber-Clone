import passport from 'passport';
import { GraphQLLocalStrategy } from 'graphql-passport';

import { Rider, Driver } from '../repositories';

export const localStrategy = () => {
  passport.use('driver-local',
    new GraphQLLocalStrategy(async(email, password, done) => {
      const user = await Driver.findByEmailPassword({ email, password }) ;
      console.log(user);
      //TODO: bcrypt 사용하여 password 확인
      const error = user ? null : new Error('no matching user');
      done(error, user);
    }),
  );
  passport.use('rider-local',
    new GraphQLLocalStrategy(async(email, password, done) => {
      const user = await Rider.findByEmailPassword({ email, password });
      //TODO: bcrypt 사용하여 password 확인
      const error = user ? null : new Error('no matching user');
      done(error, user);
    }),
  );
};
