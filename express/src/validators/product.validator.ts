import { object, string, number } from 'zod';

export const createProductSchema = object({
  body: object({
    name: string({
      required_error: 'Name is required',
    }),
    description: string({
      required_error: 'Description is required',
    }),
    price: number({
      required_error: 'Price is required',
    }).min(0, 'Price must be greater than 0'),
  }),
});
