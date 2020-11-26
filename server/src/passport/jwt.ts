import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';

import { Rider, Driver } from '../repositories/index';

export const jwtStrategy = () => {
  passport.use('jwt',
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET_KEY,
      },
      async function ({ isDriver, email }, done) {
        try {
          const user = isDriver ? Driver.findByEmail({ email }) : Rider.findByEmail({ email });
          if (!user) {
            return done(null, false);
          }
          return done(null, user);
        } catch (err) {
          return done(err, null);
        }
      },
    ),
  );
};
