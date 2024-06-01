export interface Banned {
  _id: string;
  name: string;
}

export interface BannedResponse {
  message: string;
  banned: Banned[];
}
