export interface Social {
  _id: string;
  name: string;
  link: string;
  image: null | string;
}

export interface SocialMutation {
  name: string;
  link: string;
  image: File | null;
}

export interface SocialData {
  name: string;
  link: string;
  image: File | string | null;
}

export interface ResponseSocials {
  message: string;
  socials: Social[];
}

export interface ResponseSocial {
  message: string;
  socials: Social[];
}

export interface UpdateSocialArg {
  socialId: string;
  socialMutation: SocialData;
}
