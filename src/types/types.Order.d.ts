import { Dayjs } from 'dayjs';

export interface Order {
  _id: string;
  trackerNumber: number;
  PUP: string;
  price: number;
}

export interface ShipmentAddress {
  address: string;
  phoneNumber: string;
  date: Dayjs | null;
}

export interface ShipmentMutation {
  address: string;
  phoneNumber: string;
  date: string;
}

export interface OrdersResponse {
  message: string;
  orders: Order[];
}

export interface DeliveryData extends ShipmentMutation {
  _id: string;
}
