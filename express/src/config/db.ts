import mongoose from 'mongoose';
import env from './env';

export default async function connectDb() {
  try {
    mongoose.Promise = Promise;

    await mongoose.connect(env.dbUrl);
    console.log('Connected to MongoDB');

    mongoose.connection.on('error', (error: Error) => console.log(error));
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}
