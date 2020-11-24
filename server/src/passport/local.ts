import passport from 'passport';
import { GraphQLLocalStrategy, buildContext } from 'graphql-passport';

import { Rider } from '../repositories/index';

export const localStrategy = () => {
  passport.use(
    new GraphQLLocalStrategy(async(email, password, done) => {
      const user = await Rider.findByEmailPassword({ email, password });
      const error = user ? null : new Error('no matching user');
      console.log(user);
      done(error, user);
    }),
  );
};
