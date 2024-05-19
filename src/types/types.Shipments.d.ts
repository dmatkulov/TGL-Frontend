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
  delivery: {
    status: boolean;
    date: string;
    address: string;
    phoneNumber: string;
  };
  price: {
    usd: number;
    som: number;
  };
  trackerNumber: number;
  isPaid: boolean;
  datetime: string;
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
  delivery: {
    status: boolean;
    date: string;
    address: string;
    phoneNumber: string;
  };
  trackerNumber: number;
}
export interface ShipmentThatDone {
  _id?: string;
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
  weight: string;
  dimensions: {
    height: string;
    width: string;
    length: string;
  };
}

export interface ShipmentStatusMutation {
  status: string;
}

export interface ShipmentsResponse {
  message: string;
  shipments: ShipmentData[];
}

export interface oneShipmentResponse {
  message: string;
  shipment: ShipmentData;
}