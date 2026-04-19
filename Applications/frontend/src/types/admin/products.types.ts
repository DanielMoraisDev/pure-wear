import { Size } from "./sizes.types";

export interface ProductImage {
  id: number;
  product_id: number;
  image: string;
  created_at: Date | string;
  updated_at: Date | string;
}

export interface ProductSize {
  id: number;
  product_id: number;
  size_id: number;
  created_at: Date | string;
  updated_at: Date | string;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  compare_price: number | null;
  description: string | null;
  short_description: string | null;
  image: string | null;
  image_url?: string;
  category_id: number;
  brand_id: number;
  qty: number | null;
  sku: string;
  barcode: string | null;
  status: 1 | 0;
  is_featured: "yes" | "no";
  created_at: Date | string;
  updated_at: Date | string;
  product_images: ProductImage[];
  product_sizes: ProductSize[];
}

export type FetchCreateProductParams = Omit<
  Product,
  "id" | "created_at" | "updated_at" | "image_url"
> & {
  gallery?: number[] | null;
};

export interface FetchCreateProductResponse {
  status: number;
  message: string;
  data: Product;
}

export type FetchUpdateProductParams = Omit<
  Product,
  "id" | "created_at" | "updated_at" | "image_url"
> & {
  productId: string;
};

export interface FetchUpdateProductResponse {
  status: number;
  message: string;
  data: Product;
}

export interface FetchGetAllProductParams {}

export interface FetchGetAllProductResponse {
  status: number;
  message: string;
  data: Product;
}

export interface FetchGetOneProductParams {
  productId: string;
}

export interface FetchGetOneProductResponse {
  status: number;
  data: Product;
  // Número que vai bater do id de size, para bater com o size_id
  productSizes: number[];
}

export interface FetchDeleteProductParams {
  productId: string;
}

export interface FetchDeleteProductResponse {
  status: number;
  message: string;
}

export interface SaveProductImage {
  id: number;
  image: string;
  product_id: string;
  created_at: Date | string;
  updated_at: Date | string;
}

export type FetchSaveProductImagesParams = FormData;

export interface FetchSaveProductImagesResponse {
  status: number;
  message: string;
  data: SaveProductImage;
}

export type FetchChangeProductDefaultImageParams = {
  productId: string;
  image: string;
};

export interface FetchChangeProductDefaultImageResponse {
  status: number;
  message: string;
}
