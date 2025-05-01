export type SignUpType = {
  _id?: any;
  firstname?: string;
  email?: string;
  password?: string;
};

export type SignInType = {
  _id?: any;
  email?: string;
  password?: string;
};

export type updateUserType = {
  _id?: any;
  user: {
    firstname?: string | undefined;
    email?: string;
    password?: string;
    country?: string | undefined;
    currency?: string | undefined;
    contact?: string | undefined;
    phonenumber?: string;
    lastname?: string;
  };
};

export type PasswordType = {
  _id?: any;
  currentPassword: string;
  newPassword: string;
};

export type accountType = {
  _id?: any;
  user_id?: any;
  account_name?: "crypto" | "visa debit card" | "cash" | "paypal" | string;
  account_number?: string;
  amount?: number;
  createdat?: any | null;
  updatedat?: any | null;
};
