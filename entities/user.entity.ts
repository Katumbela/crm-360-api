export interface UserEntity {
  id: string;
  email: string;
  name: string;
  company_name: string;
  website: string;
  password: string;
  address: string;
  team: string;
  city: string;
  country: string;
  plan: "Free" | "Basic" | "Premium";
  online_selling: "no" | "yes";
}

export type AccountModel = {
  user: UserEntity;
  access_token: string;
  token_type: string;
  expires_in: number;
  ends_at: Date;
  dw_cookies: any;
  contacts: [];
};
