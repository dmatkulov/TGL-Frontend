export interface ShipmentData {
  _id: string;
  userId: {
    firstName: string;
    lastName: string;
  };
  userMarketId: number;
  pupId: {
    _id: string;
    name: string;
    address: string;
    settlement: string;
    region: string;
    phoneNumber: string;
  };
  status: string;
  dimensions: {
    height: number;
    width: number;
    length: number;
  };
  weight: number;
  delivery: boolean;
  price: {
    usd: number;
    som: number;
  };
  trackerNumber: number;
  isPaid: boolean;
}

export interface Shipment {
  _id: string;
  status: string;
  pupId: {
    _id: string;
    name: string;
    address: string;
    settlement: string;
    region: string;
    phoneNumber: string;
  };
  price: {
    usd: number;
    som: number;
  };
  trackerNumber: number;
}

export interface ShipmentMutation {
  userMarketId: string;
  trackerNumber: string;
  weight: number;
  dimensions: {
    height: number;
    width: number;
    length: number;
  };
}

export interface ShipmentsResponse {
  message: string;
  shipments: ShipmentData[];
}
