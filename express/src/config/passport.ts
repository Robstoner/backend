import passport from 'passport';
import { Request } from 'express';
import dotenv from 'dotenv';

import { IUser, UserModel } from '../users/users.model';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import {
  ExtractJwt,
  Strategy as JwtStrategy,
  StrategyOptions,
  VerifiedCallback,
} from 'passport-jwt';
import { JwtPayload } from 'jsonwebtoken';
import env from './env';

dotenv.config();

passport.use(
  'signup',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    },
    async function verify(req: Request, email: string, password: string, done) {
      try {
        const { email1, password1, lastName, firstName } = req.body;
        const userExists = await UserModel.findOne({ email });

        if (userExists) {
          return done(null, false, { message: 'User already exists' });
        }

        const user = await UserModel.createUser({
          email,
          password,
          lastName,
          firstName,
        });

        return done(null, user as IUser);
      } catch (error) {
        done(error);
      }
    },
  ),
);

passport.use(
  'password',
  new LocalStrategy(
    { usernameField: 'email', passwordField: 'password' },
    async function verify(email: string, password: string, done) {
      try {
        const user = await UserModel.findOne({ email }).select('+password');

        if (!user) {
          return done(null, false, { message: 'User not found' });
        }

        const isValid = await user.checkPassword(password);

        if (!isValid) {
          return done(null, false, { message: 'Invalid password' });
        }

        return done(null, user as IUser);
      } catch (error) {
        return done(error);
      }
    },
  ),
);

const options: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: env.jwtSecret,
  passReqToCallback: true,
};

passport.use(
  new JwtStrategy(options, async function (
    req: Request,
    jwt_payload: JwtPayload,
    done: VerifiedCallback,
  ) {
    const user = await UserModel.getUserByEmail(jwt_payload.email, '+tokens');

    if (!user) {
      return done(null, false, { message: 'User not found' });
    }

    const headerToken = req.headers.authorization?.split(' ')[1];

    const userToken = user.tokens?.find((value) => value.token === headerToken);

    if (!userToken || !userToken.isValid) {
      return done(null, false, { message: 'Invalid token' });
    }

    if (userToken.expires < new Date()) {
      userToken.isValid = false;
      user.save();

      return done(null, false, { message: 'Token expired' });
    }

    return done(null, user);
  }),
);

passport.use(
  new GoogleStrategy(
    {
      clientID: env.google.clientID,
      clientSecret: env.google.clientSecret,
      callbackURL: env.google.callbackURL,
    },
    async function (accessToken, refreshToken, profile, done) {
      const userProfile = await UserModel.findOne({
        providers: { $elemMatch: { providerId: profile.id } },
      });

      if (!userProfile) {
        console.log('no provider');
        const userEmail = await UserModel.findOne({
          email: profile.emails?.[0].value,
        });

        if (userEmail) {
          userEmail.providers?.push({
            providerId: profile.id,
            providerName: profile.provider,
          });

          userEmail.save();

          return done(null, userEmail);
        } else {
          const user = await UserModel.createUser({
            email: profile.emails?.[0].value,
            firstName: profile.name?.givenName
              ? profile.name?.givenName
              : profile.displayName,
            lastName: profile.name?.familyName
              ? profile.name?.familyName
              : profile.displayName,
            slug: 'google' + profile.id,
            providers: [
              {
                providerId: profile.id,
                providerName: profile.provider,
              },
            ],
          });

          return done(null, user);
        }
      }

      return done(null, userProfile);
    },
  ),
);

export default passport;
