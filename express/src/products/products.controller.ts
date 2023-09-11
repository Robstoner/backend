import { Request, Response, Router } from 'express';
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from './products.service';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const products = await getProducts();

    res.status(200).send(products);
  } catch (e) {
    console.log(e);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const values = req.body;

    const product = await createProduct({ values });

    res.status(200).send(product);
  } catch (e) {
    console.log(e);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/:slug', async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;

    const product = await getProduct({ slug });

    res.status(200).send(product);
  } catch (e) {
    console.log(e);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/:SKU', async (req: Request, res: Response) => {
  try {
    const { SKU } = req.params;

    const product = await getProduct({ SKU });

    res.status(200).send(product);
  } catch (e) {
    console.log(e);
    res.status(500).send('Internal Server Error');
  }
});

router.put('/:slug', async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;

    const values = req.body;
    console.log(values)

    const product = await updateProduct({ slug, values });

    res.status(200).send(product);
  } catch (e) {
    console.log(e);
    res.status(500).send('Internal Server Error');
  }
});

router.delete('/:slug', async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;

    const deleted = await deleteProduct({ slug });

    if (deleted) {
      res.status(200).send('Product deleted successfully');
    }
  } catch (e) {
    console.log(e);
    res.status(500).send('Internal Server Error');
  }
});

export default router;
