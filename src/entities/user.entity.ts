export interface UserEntity {
  id: string;
  email: string;
  name: string;
  company_name: string;
  website: string;
  password: string;
  address: string;
  team: string;
  phone: number;
  city: string;
  country: string;
  plan: "Free" | "Basic" | "Premium";
  online_selling: "no" | "yes";
}



// Definindo a interface para os limites de envio de e-mails e pesquisas
export interface Limits {
  daily: number;
  monthly: number;
}

// Definindo a interface para os dados de negócios
export interface BusinessData {
  limits: {
    email: Limits;
    searches: Limits;
  };
  collaborators: any[]; // Altere o tipo conforme necessário
  // Adicione outros campos conforme necessário
}

// Função para obter os limites com base no plano
export function getLimitsForPlan(plan: string): Limits {
  switch (plan) {
    case "Free":
      return { daily: 50, monthly: 500 };
    case "Basic":
      return { daily: 100, monthly: 1000 };
    case "Premium":
      return { daily: 500, monthly: 5000 };
    default:
      throw new Error("Invalid plan type");
  }
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
