import dotenv from 'dotenv';

dotenv.config();

const env = {
  port: process.env.PORT || 3000,
  dbUrl: process.env.DB_URL || '',
  jwtSecret: process.env.JWT_SECRET || '',
  jwtExpirationTime: process.env.JWT_EXPIRATION_TIME || '',
  google: {
    clientID: process.env.GOOGLE_CLIENT_ID || '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    callbackURL: process.env.GOOGLE_CALLBACK_URL || '',
  },
};

export default env;
