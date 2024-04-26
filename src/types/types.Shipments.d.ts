export interface ShipmentData {
  _id: string;
  userId: {
    firstName: string;
    lastName: string;
  };
  userMarketId: number;
  pupId: string;
  status: string;
  dimensions: {
    height: number;
    width: number;
    length: number;
  };
  weight: number;
  price: {
    usd: number;
    som: number;
  };
  trackerNumber: number;
  isPaid: boolean;
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
