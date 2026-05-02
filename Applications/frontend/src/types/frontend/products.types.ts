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
  categories: Number[];
  brands: Number[];
}

export interface FetchGetAllProductResponse {
  status: number;
  data: Product[];
}
