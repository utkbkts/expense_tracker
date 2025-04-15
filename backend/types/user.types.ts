export interface UserType {
  id: string;
  email: string;
  firstname: string;
  lastname: string | null;
  contact: string | null;
  accounts: string[] | null;
  provider: string | null;
  country: string | null;
  currency: string;
  createdAt: string;
  updatedAt: string;
}
