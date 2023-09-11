import prisma from './prisma';

export async function nameSlugify(firstName: string, lastName: string) {
  var slug = firstName.toLowerCase() + '-' + lastName.toLowerCase();

  var check = await prisma.user.count({
    where: { slug: slug },
  });

  while (check > 0) {
    slug = firstName.toLowerCase() + '-' + lastName.toLowerCase() + '-' + Math.random().toString(36).substring(2, 7);

    check = await prisma.user.count({
      where: { slug: slug },
    });
  }

  return slug;
}

export async function userSlugify({
  email,
  firstName,
  lastName,
}: {
  email?: string;
  firstName?: string;
  lastName?: string;
}) {
  if (firstName && lastName) {
    return await nameSlugify(firstName, lastName);
  }

  if (!email) return null;

  var slug = email.split('@')[0].toLowerCase();

  var check = await prisma.user.count({
    where: { slug: slug },
  });

  while (check > 0) {
    slug = email.split('@')[0].toLowerCase() + '-' + Math.random().toString(36).substring(2, 7);

    check = await prisma.user.count({
      where: { slug: slug },
    });
  }

  return slug;
}
