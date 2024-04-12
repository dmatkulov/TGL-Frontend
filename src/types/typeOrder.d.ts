import { Dayjs } from 'dayjs';

export interface Order {
  _id: string;
  trackerNumber: number;
  PUP: string;
  price: number;
}

export interface OrderAddress {
  address: string;
  date: Dayjs | null;
}
