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

export interface User {
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
  experience: string;
  specializations: string[];
}

export interface Coach extends User {
  achievement: string;
  certificates: string[];
  isIndividualTraining: boolean;
}

export type LoginUser = {
  email: string;
  password: string;
};

export enum UserRole {
  Coach = 'тренер',
  Customer = 'пользователь',
}
