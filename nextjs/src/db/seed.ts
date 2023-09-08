import { prisma } from '../lib/prisma';

async function main() {
  await userSeed();
}

async function userSeed() {
  await prisma.user.upsert({
    where: { email: 'admin@nevexo.ro' },
    update: {
      firstName: 'Admin',
      lastName: 'Boilerplate',
      password: '$2a$10$kCdEtRJppIYVR.h6Y33YIu0IItNqobtJvIulCF/SRRMQcS/i/Sy4e', // TestTest123
    },
    create: {
      email: 'admin@nevexo.ro',
      firstName: 'Admin',
      lastName: 'Boilerplate',
      password: '$2a$10$kCdEtRJppIYVR.h6Y33YIu0IItNqobtJvIulCF/SRRMQcS/i/Sy4e', // TestTest123
    },
  });

  await prisma.user.upsert({
    where: { email: 'dev@nevexo.ro' },
    update: {
      firstName: 'Dev',
      lastName: 'Boilerplate',
      password: '$2a$10$kCdEtRJppIYVR.h6Y33YIu0IItNqobtJvIulCF/SRRMQcS/i/Sy4e', // TestTest123
    },
    create: {
      email: 'dev@nevexo.ro',
      firstName: 'Dev',
      lastName: 'Boilerplate',
      password: '$2a$10$kCdEtRJppIYVR.h6Y33YIu0IItNqobtJvIulCF/SRRMQcS/i/Sy4e', // TestTest123
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);

    await prisma.$disconnect();

    process.exit(1);
  });
