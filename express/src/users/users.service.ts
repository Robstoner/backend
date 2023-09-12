import { IProduct } from '../products/products.model';
import { IUser, UserModel } from './users.model';

export async function getUsers(): Promise<IUser[]> {
  try {
    const users = await UserModel.getUsers();

    return users;
  } catch (error) {
    throw error;
  }
}

export async function getUser(
  slug: string,
  products?: boolean,
): Promise<IUser | (IUser & { products: IProduct[] })> {
  try {
    if (products) {
      const user = UserModel.aggregate([
        { $match: { slug } },
        {
          $lookup: {
            from: 'products',
            localField: '_id',
            foreignField: 'user',
            as: 'products',
          },
        },
        {
          $unset: ['password', 'tokens'],
        },
      ]).exec() as unknown as IUser & { products: IProduct[] };

      return user;
    }

    const user = await UserModel.getUserBySlug(slug);

    return user;
  } catch (error) {
    throw error;
  }
}

export async function updateUser(
  slug: string,
  values: Record<string, any>,
): Promise<IUser> {
  try {
    const user = await UserModel.updateUserBySlug(slug, values);

    return user;
  } catch (error) {
    throw error;
  }
}

export async function deleteUser(slug: string): Promise<boolean> {
  try {
    await UserModel.deleteUserBySlug(slug);

    return true;
  } catch (error) {
    throw error;
  }
}
