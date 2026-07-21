export interface UserAttributes {
  id: number;
  name: string;
  email: string;
  role: "customer" | "admin";
  email_verified_at: Date;
  password: string;
  created_at: Date;
  updated_at: Date;
}

export interface UserAlterAttributes {
  name: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  mobile: string;
}
