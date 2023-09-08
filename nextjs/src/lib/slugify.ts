import prisma from './prisma';

export async function nameSlugify(firstName: string, lastName: string) {
  var slug = firstName + '-' + lastName;

  var check = await prisma.user.count({
    where: { slug: slug },
  });

  while (check > 0) {
    slug = firstName + '-' + lastName + '-' + Math.random().toString(36).substring(2, 7);

    check = await prisma.user.count({
      where: { slug: slug },
    });
  }

  return slug;
}

export async function userSlugify(email: string, firstName?: string, lastName?: string) {
  if (firstName && lastName) {
    return await nameSlugify(firstName, lastName);
  }

  var slug = email.split('@')[0];

  var check = await prisma.user.count({
    where: { slug: slug },
  });

  while (check > 0) {
    slug = email.split('@')[0] + '-' + Math.random().toString(36).substring(2, 7);

    check = await prisma.user.count({
      where: { slug: slug },
    });
  }

  return slug;
}
