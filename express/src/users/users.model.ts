import { Document, Model, ObjectId, Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import { slugifyUser } from '../helpers/slugify';
import env from '../config/env';

export interface IUser extends Document {
  email: string;
  slug?: string;
  firstName: string;
  lastName: string;
  password?: string;
  providers?: {
    providerName: string;
    providerId: string;
  }[];
  tokens?: {
    token: string;
    expires: Date;
    isValid: boolean;
  }[];
  checkPassword(password: string): Promise<boolean>;
}

interface IUserModel extends Model<IUser> {
  getUsers(): Promise<IUser[]>;
  getUserByEmail(email: string, select?: string): Promise<IUser>;
  getUserById(id: string, select?: string): Promise<IUser>;
  getUserBySlug(slug: string, select?: string): Promise<IUser>;
  createUser(values: Record<string, any>): Promise<IUser>;
  updateUserById(id: string, values: Record<string, any>): Promise<IUser>;
  updateUserBySlug(slug: string, values: Record<string, any>): Promise<IUser>;
  deleteUserById(id: string): Promise<IUser>;
  deleteUserBySlug(slug: string): Promise<IUser>;
  addTokenByEmail(email: string, token: string): Promise<IUser>;
  addToken(id: string, token: string): Promise<IUser>;
}

const TokenSchema = new Schema({
  token: { type: String, required: true },
  expires: { type: Date, required: true },
  isValid: { type: Boolean, required: true },
});

const AccountSchema = new Schema({
  providerName: { type: String, required: true },
  providerId: { type: String, required: true },
});

const UserSchema: Schema<IUser> = new Schema({
  email: { type: String, required: true, unique: true, lowercase: true },
  slug: { type: String, unique: true, lowercase: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, select: false },
  providers: [AccountSchema],
  tokens: { type: [TokenSchema], select: false },
});

UserSchema.pre('save', async function (next) {
  const user = this;

  if (!user.isModified('password')) return next();

  if (!user.password) return next();

  const hash = await bcrypt.hash(user.password, 10);

  user.password = hash;

  next();
});

UserSchema.pre('save', async function (next) {
  const user = this;

  if (!user.isModified('firstName') && !user.isModified('lastName'))
    return next();

  user.slug = slugifyUser({
    firstName: user.firstName,
    lastName: user.lastName,
  });

  next();
});

UserSchema.pre('findOneAndUpdate', async function (next) {
  var firstName = this.get('firstName');
  var lastName = this.get('lastName');
  if (!firstName && !lastName) return next();

  const query = this.getQuery();

  const user = await UserModel.findOne(query);

  if (!user) return next();

  if (!firstName) firstName = user.firstName;
  if (!lastName) lastName = user.lastName;

  this.set('slug', slugifyUser({ firstName, lastName }));

  next();
});

UserSchema.methods.checkPassword = async function (password: string) {
  const user = this as IUser;

  if (!user.password) return false;

  const compare = await bcrypt.compare(password, user.password);

  return compare;
};

UserSchema.statics.getUsers = function getUsers() {
  return this.find();
};

UserSchema.statics.getUserByEmail = function getUserByEmail(
  email: string,
  select?: string,
) {
  return this.findOne({ email }).select(select);
};

UserSchema.statics.getUserById = function getUserById(
  id: ObjectId,
  select?: string,
) {
  return this.findById(id).select(select);
};

UserSchema.statics.getUserBySlug = function getUserBySlug(
  slug: string,
  select?: string,
) {
  return this.findOne({ slug }).select(select);
};

UserSchema.statics.createUser = function createUser(
  values: Record<string, any>,
) {
  return new this(values).save().then((user) => user.toObject());
};

UserSchema.statics.updateUserById = function updateUserById(
  id: ObjectId,
  values: Record<string, any>,
) {
  return this.findOneAndUpdate({ _id: id }, values);
};

UserSchema.statics.updateUserBySlug = function updateUserBySlug(
  slug: string,
  values: Record<string, any>,
) {
  return this.findOneAndUpdate({ slug }, values);
};

UserSchema.statics.deleteUserBySlug = function deleteUserBySlug(slug: string) {
  return this.findOneAndDelete({ slug });
};

UserSchema.statics.deleteUserById = function deleteUserById(id: string) {
  return this.findByIdAndDelete(id);
};
UserSchema.statics.addTokenByEmail = function addTokenByEmail(
  email: string,
  token: string,
) {
  const expires = new Date(Date.now() + Number(env.jwtExpirationTime) * 1000);

  return this.findOneAndUpdate(
    { email },
    {
      $push: {
        tokens: {
          token,
          expires,
          isValid: true,
        },
      },
    },
  );
};

export const UserModel = model<IUser, IUserModel>('User', UserSchema);
