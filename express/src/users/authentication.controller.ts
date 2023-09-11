import { Router } from 'express';
import passport from 'passport';
import { generateToken } from '../helpers/jwt';
import { IUser, UserModel } from './users.model';
import env from '../config/env';

const router = Router();

router.get(
  '/logout',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const user: IUser = req.user as IUser;

    const token = req.headers.authorization?.split(' ')[1];

    const userObj = await UserModel.findOne(
      { email: user.email },
      { tokens: { $elemMatch: { token } } },
    ).select('+tokens');

    if (!userObj) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    if (!userObj.tokens?.find((value) => value.token === token)) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    userObj.tokens[0].isValid = false;

    userObj.save();

    res.json({ message: 'User logged out' });
  },
);

router.get(
  '/logout-all',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const user: IUser = req.user as IUser;

    const userObj = await UserModel.getUserByEmail(user.email, '+tokens');

    if (!userObj) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    userObj.tokens?.forEach((value) => {
      value.isValid = false;
    });

    userObj.save();

    res.json({ message: 'User logged out of all sessions' });
  },
);

router.post(
  '/signup',
  passport.authenticate('signup', { session: false }),
  async (req, res) => {
    const user: IUser = req.user as IUser;

    const userObject = await UserModel.getUserByEmail(user.email, '+tokens');

    const token = generateToken(user.email);

    userObject.tokens?.push({
      token,
      expires: new Date(Date.now() + Number(env.jwtExpirationTime) * 1000),
      isValid: true,
    });

    userObject.save();

    res.json({ token });
  },
);

router.post(
  '/login',
  passport.authenticate('password', { session: false }),
  async (req, res) => {
    const user: IUser = req.user as IUser;

    const userObject = await UserModel.getUserByEmail(user.email, '+tokens');

    const token = generateToken(user.email);

    userObject.tokens?.push({
      token,
      expires: new Date(Date.now() + Number(env.jwtExpirationTime) * 1000),
      isValid: true,
    });

    userObject.save();

    res.json({ token });
  },
);

router.get(
  '/login/google',
  passport.authenticate('google', {
    session: false,
    scope: ['profile', 'email'],
  }),
);

router.get(
  '/login/google/callback',
  passport.authenticate('google', {
    session: false,
    failureRedirect: '/login',
  }),
  async (req, res) => {
    const user: IUser = req.user as IUser;

    const userObject = await UserModel.getUserByEmail(user.email, '+tokens');

    const token = generateToken(user.email);

    userObject.tokens?.push({
      token,
      expires: new Date(Date.now() + Number(env.jwtExpirationTime) * 1000),
      isValid: true,
    });

    userObject.save();

    res.json({ token });
  },
);

export default router;
