import { IProduct, ProductModel } from './products.model';

export async function getProducts(): Promise<IProduct[]> {
  try {
    const products = await ProductModel.getProducts();

    return products;
  } catch (error) {
    throw error;
  }
}

export async function getProduct({
  slug,
  SKU,
}: {
  slug?: string;
  SKU?: string;
}): Promise<IProduct> {
  try {
    if (slug) return await ProductModel.getProductBySlug({ slug });
    if (SKU) return await ProductModel.getProductBySKU({ SKU });

    throw new Error('No slug or SKU provided');
  } catch (error) {
    throw error;
  }
}

export async function createProduct({
  values,
}: {
  values: Record<string, any>;
}): Promise<IProduct> {
  try {
    return await ProductModel.createProduct({ values });
  } catch (error) {
    throw error;
  }
}

export async function updateProduct({
  slug,
  values,
}: {
  slug: string;
  values: Record<string, any>;
}): Promise<IProduct> {
  try {
    return await ProductModel.updateProductBySlug({ slug, values });
  } catch (error) {
    throw error;
  }
}

export async function deleteProduct({
  slug,
}: {
  slug: string;
}): Promise<boolean> {
  try {
    await ProductModel.deleteProductBySlug({ slug });

    return true;
  } catch (error) {
    throw error;
  }
}
