import { Product } from "../products.types";

export interface FetchGetAllProductParams {}

export interface FetchGetAllProductResponse {
  status: number;
  message: string;
  data: Product[];
}
