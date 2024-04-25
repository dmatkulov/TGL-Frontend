import { Dayjs } from 'dayjs';

export interface Order {
  _id: string;
  trackerNumber: number;
  PUP: string;
  price: number;
}

export interface ShipmentAddress {
  address: string;
  date: Dayjs | null;
}

export interface ShipmentMutation {
  address: string;
  date: string;
}

export interface OrdersResponse {
  message: string;
  orders: Order[]
}
