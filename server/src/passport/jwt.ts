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
          const data = isDriver ? await Driver.findByEmail({ email }) : await Rider.findByEmail({ email });
          if (!data) {
            return done(null, false);
          }
          return done(null, { data, isDriver });
        } catch (err) {
          return done(err, null);
        }
      },
    ),
  );
};
