import { object, string, number } from 'zod';

export const createProductSchema = object({
  body: object({
    name: string({
      required_error: 'Name is required',
    }),
    SKU: string({
      required_error: 'SKU is required',
    }),
    description: string({
      required_error: 'Description is required',
    }),
    price: number({
      required_error: 'Price is required',
    }).nonnegative({ message: 'Price must be a positive number' }),
    user: string({}).optional(),
  }),
});
