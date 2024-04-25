import { Region } from './types.Regions';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';

export interface User {
  _id: string;
  email: string;
  pupID: string;
  marketId: string;
  firstName: string;
  lastName: string;
  middleName: string;
  role: string;
  token: string;
  phoneNumber: string;
  region: Region;
  settlement: string;
  address: string;
}

export interface RegisterMutation {
  email: string;
  password: string;
  pupID: string;
  firstName: string;
  lastName: string;
  middleName: string;
  phoneNumber: string;
  region: string;
  settlement: string;
  address: string;
}

export interface UserNav {
  id: number;
  name: string;
  navLink: string;
  icon: ReactJSXElement;
}

export interface LoginMutation {
  email: string;
  password: string;
}

export interface RegisterResponse {
  message: string;
  user: User;
}
