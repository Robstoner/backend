import { Prisma } from '@prisma/client';
import prisma from '../prisma';
import { userSlugify } from '../slugify';

export async function getAllUsers() {
  const users = await prisma.user.findMany();

  return users;
}

export async function getUserBySlug(slug: string) {
  const user = await prisma.user.findUnique({
    where: { slug: slug },
  });

  return user;
}

export async function getUserById(id: string) {
  const user = await prisma.user.findUnique({
    where: { id: id },
  });

  return user;
}

export async function createUser(data: Prisma.UserCreateInput) {
  console.log(data);
  const user = await prisma.user.create({
    data: {
      ...data,
      slug:
        data.slug ||
        (await userSlugify({
          email: data.email as string,
          firstName: data.firstName as string,
          lastName: data.lastName as string,
        })),
    },
  });

  return user;
}

export async function updateUserById(id: string, data: Prisma.UserUpdateInput) {
  const newSlug = await userSlugify({
    email: data.email as string,
    firstName: data.firstName as string,
    lastName: data.lastName as string,
  });

  const user = await prisma.user.update({
    where: { id: id },
    data: {
      ...data,
      slug:
        data.slug || newSlug || undefined,
    },
  });

  return user;
}

export async function updateUserBySlug(slug: string, data: Prisma.UserUpdateInput) {
  const newSlug = await userSlugify({
    email: data.email as string,
    firstName: data.firstName as string,
    lastName: data.lastName as string,
  });

  const user = await prisma.user.update({
    where: { slug: slug },
    data: {
      ...data,
      slug:
        data.slug || newSlug || slug,
    },
  });

  return user;
}

export async function deleteUserById(id: string) {
  const user = await prisma.user.delete({
    where: { id: id },
  });

  return user;
}

export async function deleteUserBySlug(slug: string) {
  const user = await prisma.user.delete({
    where: { slug: slug },
  });

  return user;
}
