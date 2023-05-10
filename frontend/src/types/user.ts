export type CreateUser = {
  name: string;
  email: string;
  avatar?: string;
  password: string;
  sex: string;
  dateBirth: string;
  role: string;
  location: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  password: string;
  sex: string;
  dateBirth: string;
  role: string;
  location: string;
  about?: string;
};

export type LoginUser = {
  email: string;
  password: string;
};

export enum UserRole {
  Coach = 'тренер',
  Customer = 'пользователь',
}
