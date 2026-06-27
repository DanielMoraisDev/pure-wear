import { Brand } from "../brands.type";

export interface FetchGetAllBrandParams {}

export interface FetchGetAllBrandResponse {
  status: number;
  data: Brand[];
}
