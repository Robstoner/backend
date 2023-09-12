import jwt from 'jsonwebtoken';
import env from '../config/env.config';

export function generateToken(email: string) {
  return jwt.sign({ email }, env.jwtSecret, {
    expiresIn: Number(env.jwtExpirationTime),
  });
}
