import { IUser, UserModel } from './users.model';

export async function getUsers(): Promise<IUser[]> {
  try {
    const users = await UserModel.getUsers();

    return users;
  } catch (error) {
    throw error;
  }
}

export async function getUser(slug: string): Promise<IUser> {
  try {
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
