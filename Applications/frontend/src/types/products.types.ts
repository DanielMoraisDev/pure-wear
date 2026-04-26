interface ProductImages {
  image: string;
  imageDescription: string;
}

export interface ProductAttributes {
  id: string;
  name: string;
  price: number;
  images: ProductImages[];
  discount?: number;
  sku?: string;
  description?: string;
  rating?: number;
  reviewsCount?: number;
  sizes?: string[];
}

export interface ProductCart {
  id: string;
  name: string;
  img: string;
  price: number;
  description: string;
  size: string;
  quantity: number;
}

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
