export interface Price {
  _id: string;
  exchangeRate: string;
  deliveryPrice: string;
}

export interface PriceMutation {
  exchangeRate: string;
  deliveryPrice: string;
}

export interface UpdatePriceArg {
  id: string;
  priceMutation: PriceMutation;
}

export interface PriceResponse {
  message: string;
  price: Price;
}
