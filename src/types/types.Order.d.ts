import { Dayjs } from 'dayjs';

export interface Order {
  _id: string;
  trackerNumber: number;
  pupId: {
    _id: string;
    name: string;
    region: string;
    settlement: string;
    address: string;
    phoneNumber: number;
  }
  status: string;
  price: {
    usd: string;
    som: string;
  };
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
  shipments: Order[];
}
