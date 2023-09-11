import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import env from './config/env';
import passport from './config/passport';
import connectDb from './config/db';

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
  res.json({ message: 'Hello World' });
});

// Routes

app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);

const server = http.createServer(app);

server.listen(env.port, async () => {
  await connectDb();

  console.log('Server listening on port 3000');
});
