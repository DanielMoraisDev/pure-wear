export interface Brand {
  id: number;
  name: string;
  status: number;
  created_at: Date;
  updated_at: Date;
}

export interface FetchCreateBrandParams {
  name: string;
  status: number;
}

export interface FetchCreateBrandResponse {
  status: number;
  message: string;
  data: Brand;
}

export interface FetchUpdateBrandParams {
  brandId: string;
  name: string;
  status: number;
}

export interface FetchUpdateBrandResponse {
  status: number;
  message: string;
  data: Brand;
}

export interface FetchGetAllBrandParams {}

export interface FetchGetAllBrandResponse {
  status: number;
  message: string;
  data: Brand;
}

export interface FetchGetOneBrandParams {
  brandId: string;
}

export interface FetchGetOneBrandResponse {
  status: number;
  data: Brand;
}

export interface FetchDeleteBrandParams {
  brandId: string;
}

export interface FetchDeleteBrandResponse {
  status: number;
  message: string;
}
