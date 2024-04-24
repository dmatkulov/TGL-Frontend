import { Region } from './types.Regions';

export interface Pup {
  _id: string;
  name: string;
  region: Region;
  settlement: string;
  address: string;
  phoneNumber: string;
}

export interface PupMutation {
  region: string;
  settlement: string;
  address: string;
  phoneNumber: string;
}

export interface PupResponse {
  message: string;
  pups: Pup[];
}
