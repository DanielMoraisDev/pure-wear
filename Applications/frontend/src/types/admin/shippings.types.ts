import { ApiResponse } from "../success.types";

export interface ShippingGetParams {}

export interface ShippingGetResponse extends ApiResponse {
  data: {
    shipping_charge: number;
  };
}

export interface ShippingUpdateBody {
  shipping_charge: number;
}

export interface ShippingUpdateResponse extends ApiResponse {}
