export interface Pup {
  _id: string;
  name: string;
  region: string;
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
