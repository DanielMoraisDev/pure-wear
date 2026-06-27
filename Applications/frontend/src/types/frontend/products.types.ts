import { Product } from "../products.types";

export interface FetchGetAllFeaturedProductParams {}

export interface FetchGetAllFeaturedProductResponse {
  status: number;
  data: Product[];
}

export interface FetchGetAllLatestProductParams {}

export interface FetchGetAllLatestProductResponse {
  status: number;
  data: Product[];
}

export interface FetchGetAllProductParams {
  categories: number[];
  brands: number[];
}

export interface FetchGetAllProductResponse {
  status: number;
  data: Product[];
}

export interface FetchGetProductParams {
  productId: number;
}

export interface FetchGetProductResponse {
  status: number;
  data: Product;
}
