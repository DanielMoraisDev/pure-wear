import { Category } from "../categories.type";

export interface FetchGetAllCategoryParams {}

export interface FetchGetAllCategoryResponse {
  status: number;
  data: Category[];
}
