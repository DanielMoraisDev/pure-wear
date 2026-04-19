export interface Size {
  id: number;
  name: string;
  created_at: Date | string;
  updated_at: Date | string;
}

export interface FetchGetAllSizeParams {}

export interface FetchGetAllSizeResponse {
  status: number;
  data: Size[];
}
