export interface TempImage {
  id: number;
  name: string;
  created_at: Date | string;
  updated_at: Date | string;
}

export type FetchCreateTempImageParams = FormData;

export interface FetchCreateTempImageResponse {
  status: number;
  message: string;
  data: TempImage;
}
