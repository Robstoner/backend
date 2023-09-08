// ts-ignore 7017 is used to ignore the error that the global object is not
// defined in the global scope. This is because the global object is only
// defined in the global scope in Node.js and not in the browser.

import { PrismaClient } from '@prisma/client';
import { nameSlugify, userSlugify } from './slugify';

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
//
// Learn more:
// https://pris.ly/d/help/next-js-best-practices

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['query'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// prisma.$extends({
//   query: {
//     user: {
//       async update({ args, query }) {
//         if (args.data?.firstName || args.data?.lastName || args.data?.email) {
//           const slug = await userSlugify({
//             email: args.data.email as string,
//             firstName: args.data.firstName as string,
//             lastName: args.data.lastName as string,
//           });

//           if (slug) args.data.slug = slug;
//         }

//         return query(args);
//       },
//       async upsert({ args, query }) {
//         if (args.create?.firstName || args.create?.lastName || args.create?.email) {
//           const slug = await userSlugify({
//             email: args.create.email as string,
//             firstName: args.create.firstName as string,
//             lastName: args.create.lastName as string,
//           });

//           if (slug) args.create.slug = slug;
//         }

//         if (args.update?.firstName || args.update?.lastName || args.update?.email) {
//           const slug = await userSlugify({
//             email: args.update.email as string,
//             firstName: args.update.firstName as string,
//             lastName: args.update.lastName as string,
//           });

//           if (slug) args.update.slug = slug;
//         }

//         return query(args);
//       },
//       async create({ args, query }) {
//         console.log(args);
//         if (args.data?.firstName || args.data?.lastName || args.data?.email) {
//           const slug = await userSlugify({
//             email: args.data.email as string,
//             firstName: args.data.firstName as string,
//             lastName: args.data.lastName as string,
//           });

//           if (slug) args.data.slug = slug;
//         }

//         return query(args);
//       },
//     },
//   },
// });

// prisma.$extends({
//   result: {
//     user: {
//       slug: {
//         needs: { firstName: true, lastName: true },
//         compute(user) {
//           return nameSlugify(user.firstName as string, user.lastName as string);
//         }
//       }
//     }
//   }
// })

export default prisma;
