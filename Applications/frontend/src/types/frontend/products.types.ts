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
