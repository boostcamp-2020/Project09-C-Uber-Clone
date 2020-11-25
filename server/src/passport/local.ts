import passport from 'passport';
import { GraphQLLocalStrategy } from 'graphql-passport';

import { Rider } from '../repositories';

export const localStrategy = () => {
  passport.use(
    new GraphQLLocalStrategy(async(email, password, done) => {
      const user = await Rider.findByEmailPassword({ email, password });
      const error = user ? null : new Error('no matching user');
      done(error, user);
    }),
  );
};
