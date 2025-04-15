export interface UserType {
    id: number;
    email: string;
    firstName: string;
    lastName: string | null;
    contact: string | null;
    accounts: string[] | null;
    provider: string | null;
    country: string | null;
    currency: string;
    createdAt: string; 
    updatedAt: string; 
  }
  