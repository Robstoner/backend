import { Document, Model, ObjectId, Schema, model } from 'mongoose';
import { IUser } from '../users/users.model';
import { slugifyProduct } from '../helpers/slugify';

export interface IProduct extends Document {
  name: string;
  SKU: string;
  slug?: string;
  description: string;
  price: number;
  user?: IUser['_id'];
  createdAt?: Date;
  updatedAt?: Date;
}

interface IProductModel extends Model<IProduct> {
  getProducts(): Promise<IProduct[]>;
  getProductBySlug({
    slug,
    select,
  }: {
    slug: string;
    select?: string;
  }): Promise<IProduct>;
  getProductById({
    id,
    select,
  }: {
    id: ObjectId;
    select?: string;
  }): Promise<IProduct>;
  getProductBySKU({
    SKU,
    select,
  }: {
    SKU: string;
    select?: string;
  }): Promise<IProduct>;
  createProduct({ values }: { values: Record<string, any> }): Promise<IProduct>;
  updateProductById({
    id,
    values,
  }: {
    id: ObjectId;
    values: Record<string, any>;
  }): Promise<IProduct>;
  updateProductBySlug({
    slug,
    values,
  }: {
    slug: string;
    values: Record<string, any>;
  }): Promise<IProduct>;
  deleteProductBySlug({ slug }: { slug: string }): boolean;
  deleteProductById({ id }: { id: string }): boolean;
}

const ProductSchema: Schema<IProduct> = new Schema(
  {
    name: { type: String, required: true },
    SKU: { type: String, required: true, unique: true },
    slug: { type: String, unique: true, lowercase: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true },
);

ProductSchema.pre('save', async function (next) {
  const product = this;

  if (!product.isModified('name')) return next();

  product.slug = slugifyProduct({ name: product.name });

  next();
});

ProductSchema.pre('findOneAndUpdate', async function (next) {
  var name = this.get('name');
  if (!name) return next();

  const query = this.getQuery();

  const product = await ProductModel.findOne(query);

  if (!product) return next();

  this.set('slug', slugifyProduct({ name }));

  next();
});

ProductSchema.statics.getProducts = async function (): Promise<IProduct[]> {
  try {
    const products = await this.find();

    return products;
  } catch (error) {
    throw error;
  }
};

ProductSchema.statics.getProductBySlug = async function ({
  slug,
}: {
  slug: string;
}): Promise<IProduct> {
  try {
    const product = await this.findOne({ slug });

    return product;
  } catch (error) {
    throw error;
  }
};

ProductSchema.statics.getProductById = async function ({
  id,
}: {
  id: ObjectId;
}): Promise<IProduct> {
  try {
    const product = await this.findById(id);

    return product;
  } catch (error) {
    throw error;
  }
};

ProductSchema.statics.getProductBySKU = async function ({
  SKU,
}: {
  SKU: string;
}): Promise<IProduct> {
  try {
    const product = await this.findOne({ SKU });

    return product;
  } catch (error) {
    throw error;
  }
};

ProductSchema.statics.createProduct = async function ({
  values,
}: {
  values: Record<string, any>;
}): Promise<IProduct> {
  try {
    const product = await this.create(values);

    return product;
  } catch (error) {
    throw error;
  }
};

ProductSchema.statics.updateProductById = async function ({
  id,
  values,
}: {
  id: ObjectId;
  values: Record<string, any>;
}): Promise<IProduct> {
  try {
    const product = await this.findOneAndUpdate({ _id: id }, values, { new: true });

    return product;
  } catch (error) {
    throw error;
  }
};

ProductSchema.statics.updateProductBySlug = async function ({
  slug,
  values,
}: {
  slug: string;
  values: Record<string, any>;
}): Promise<IProduct> {
  try {
    const product = await this.findOneAndUpdate({ slug }, values, { new: true });

    return product;
  } catch (error) {
    throw error;
  }
};

ProductSchema.statics.deleteProductById = async function ({
  id,
}: {
  id: ObjectId;
}): Promise<boolean> {
  try {
    await this.findByIdAndDelete(id);

    return true;
  } catch (error) {
    throw error;
  }
};

ProductSchema.statics.deleteProductBySlug = async function ({
  slug,
}: {
  slug: string;
}): Promise<boolean> {
  try {
    await this.findOneAndDelete({ slug });

    return true;
  } catch (error) {
    throw error;
  }
};

export const ProductModel = model<IProduct, IProductModel>(
  'Product',
  ProductSchema,
);
