export type CreateUser = {
  email: string;
  name: string;
  password: string;
};

export type LoginUser = Pick<CreateUser, 'email' | 'password'>;

export type User = {
  id: string;
  email: string;
  name: string;
  registerDate: string;
  isAdmin?: boolean;
};
