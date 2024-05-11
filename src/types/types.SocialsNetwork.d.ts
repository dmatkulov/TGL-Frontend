
export interface Socials {
  _id: string;
  link: string;
  image: null | string;
}

export interface SocialData {
  link: string;
  image: File | null;
}

export interface SocialDataMutation {
  link: string;
  image: null | string;
}

export interface ResponseSocials {
  message: string;
  socials: Socials [];
}