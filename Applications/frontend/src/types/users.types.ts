export interface UserAttributes {
  id: number;
  name: string;
  email: string;
  role: "costumer" | "admin";
  email_verified_at: Date;
  password: string;
  created_at: Date;
  updated_at: Date;
}
