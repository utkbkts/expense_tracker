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
  firstname?: string;
  email?: string;
  password?: string;
  country?: string | undefined;
  currency?: string | undefined;
  phonenumber?: string;
  lastname?: string;
};
