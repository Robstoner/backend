import APIError from '../errors/APIError';
import ValidationError from '../errors/ValidationError';
import { IProduct, ProductModel } from './products.model';

export async function getProducts(): Promise<IProduct[]> {
  const products = await ProductModel.getProducts();

  return products;
}
export async function getProduct({
  slug,
  SKU,
  full,
}: {
  slug?: string;
  SKU?: string;
  full?: boolean;
}): Promise<IProduct> {
  if (slug)
    return (await ProductModel.getProductBySlug({ slug })).populate({
      path: full ? 'user' : '',
      strictPopulate: false,
    });
  if (SKU)
    return (await ProductModel.getProductBySKU({ SKU })).populate({
      path: full ? 'user' : '',
      strictPopulate: false,
    });

  throw new ValidationError({ message: 'No slug or SKU provided' });
}

export async function createProduct({
  values,
}: {
  values: Record<string, any>;
}): Promise<IProduct> {
  const product = await ProductModel.createProduct({ values });

  if (!product) throw new APIError({});

  return product;
}

export async function updateProduct({
  slug,
  values,
}: {
  slug: string;
  values: Record<string, any>;
}): Promise<IProduct> {
  const product = await ProductModel.updateProductBySlug({ slug, values });

  if (!product) throw new APIError({});

  return product;
}

export async function deleteProduct({
  slug,
}: {
  slug: string;
}): Promise<boolean> {
  const done = await ProductModel.deleteProductBySlug({ slug });

  if (!done) throw new APIError({});

  return true;
}
