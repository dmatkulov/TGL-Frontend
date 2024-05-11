import {WarehouseMutation} from './types.Warehouses';

export interface Socials {
  _id: string;
  name: string;
  link: string;
  image: null | string;
}

export interface SocialData {
  name: string;
  link: string;
  image: File | string | null;
}

export interface SocialDataMutation {
  name: string;
  link: string;
  image: null | string;
}

export interface ResponseSocials {
  message: string;
  socials: Socials [];
}

export interface UpdateSocialArg {
  socialId: string;
  socialMutation: SocialData;
}