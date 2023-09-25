import mongoose from 'mongoose';
import env from './env.config';

export default async function connectDb() {
  try {
    mongoose.Promise = Promise;

    await mongoose.connect(env.dbUrl);
    console.log('Connected to MongoDB');

  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}
