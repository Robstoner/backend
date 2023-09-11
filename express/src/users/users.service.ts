import { UserModel } from './users.model';

export async function getUsers() {
  return UserModel.getUsers();
}

export async function getUser(slug: string) {
  console.log(slug);
  const user = await UserModel.getUserBySlug(slug);
  console.log(user);
  return user;
}

export async function updateUser(slug: string, values: Record<string, any>) {
  return UserModel.updateUserBySlug(slug, values);
}

export async function deleteUser(slug: string) {
  return UserModel.deleteUserBySlug(slug);
}
