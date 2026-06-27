export interface Category {
  id: number;
  name: string;
  status: number;
  created_at: Date;
  updated_at: Date;
}

export interface FetchCreateCategoryParams {
  name: string;
  status: number;
}

export interface FetchCreateCategoryResponse {
  status: number;
  message: string;
  data: Category;
}

export interface FetchUpdateCategoryParams {
  categoryId: string;
  name: string;
  status: number;
}

export interface FetchUpdateCategoryResponse {
  status: number;
  message: string;
  data: Category;
}

export interface FetchGetAllCategoryParams {}

export interface FetchGetAllCategoryResponse {
  status: number;
  message: string;
  data: Category;
}

export interface FetchGetOneCategoryParams {
  categoryId: string;
}

export interface FetchGetOneCategoryResponse {
  status: number;
  data: Category;
}

export interface FetchDeleteCategoryParams {
  categoryId: string;
}

export interface FetchDeleteCategoryResponse {
  status: number;
  message: string;
}
