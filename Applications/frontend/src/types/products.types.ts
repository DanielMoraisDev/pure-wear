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
