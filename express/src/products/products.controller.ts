import { NextFunction, Request, Response, Router } from 'express';
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from './products.service';
import passport from '../config/passport.config';
import validate from '../middleware/validate.middleware';
import { createProductSchema } from '../validators/product.validator';
import catchAsync from '../middleware/catchAsync.middleware';

const router = Router();

router.get(
  '/',
  catchAsync(async (req: Request, res: Response) => {
    const products = await getProducts();

    res.status(200).send(products);
  }),
);

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  validate(createProductSchema),
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const values = req.body;

    const product = await createProduct({ values });

    res.status(200).send(product);
  }),
);

router.get(
  '/:slug',
  catchAsync(async (req: Request, res: Response) => {
    const { slug } = req.params;
    const { full } = req.query as { full?: boolean };

    const product = await getProduct({ slug, full });

    res.status(200).send(product);
  }),
);

router.get(
  '/:SKU',
  catchAsync(async (req: Request, res: Response) => {
    const { SKU } = req.params;

    const product = await getProduct({ SKU });

    res.status(200).send(product);
  }),
);

router.put(
  '/:slug',
  passport.authenticate('jwt', { session: false }),
  catchAsync(async (req: Request, res: Response) => {
    const { slug } = req.params;

    const values = req.body;
    console.log(values);

    const product = await updateProduct({ slug, values });

    res.status(200).send(product);
  }),
);

router.delete(
  '/:slug',
  passport.authenticate('jwt', { session: false }),
  catchAsync(async (req: Request, res: Response) => {
    const { slug } = req.params;

    const deleted = await deleteProduct({ slug });

    if (deleted) {
      res.status(200).send('Product deleted successfully');
    }
  }),
);

export default router;
