import { Request, Response, Router } from 'express';
import passport from 'passport';
import { deleteUser, getUser, getUsers, updateUser } from './users.service';
import catchAsync from '../middleware/catchAsync.middleware';

const router = Router();

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  catchAsync(async (req: Request, res: Response) => {
    const users = await getUsers();

    res.json(users);
  }),
);

router.get(
  '/:slug',
  passport.authenticate('jwt', { session: false }),
  catchAsync(async (req: Request, res: Response) => {
    const { slug } = req.params;
    const { products } = req.query as { products?: boolean };

    const user = await getUser(slug, products);

    res.json(user);
  }),
);

router.put(
  '/update/:slug',
  passport.authenticate('jwt', { session: false }),
  catchAsync(async (req: Request, res: Response) => {
    const { slug } = req.params;

    const user = await updateUser(slug, req.body);

    res.json(user);
  }),
);

router.delete(
  '/delete/:slug',
  passport.authenticate('jwt', { session: false }),
  catchAsync(async (req: Request, res: Response) => {
    const { slug } = req.params;

    await deleteUser(slug);

    res.json({ message: 'User deleted successfully' });
  }),
);

export default router;
