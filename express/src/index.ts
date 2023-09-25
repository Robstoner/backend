import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';

import env from './config/env.config';
import passport from './config/passport.config';
import connectDb from './config/db.config';

import errorHandler from './middleware/errorHandler.middleware';
import errorConverter from './middleware/errorConverter.middleware';

import usersRouter from './users/users.controller';
import authRouter from './users/authentication.controller';
import productsRouter from './products/products.controller';

const app = express();

app.use(
  cors({
    credentials: true,
  }),
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(compression());
app.use(cookieParser());

app.use(passport.initialize());

app.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  // throw new ValidationError({ message: 'Hello World' });
  res.json({ message: 'Hello World' });
});

// Routes

app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);

// Error handling

app.use(errorConverter);
app.use(errorHandler);

const server = http.createServer(app);

server.listen(env.port, async () => {
  await connectDb();

  console.log('Server listening on port 3000');
});
