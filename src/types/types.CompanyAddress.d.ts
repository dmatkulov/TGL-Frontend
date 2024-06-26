export interface CompanyAddress {
  _id: string;
  address: string;
  district: string;
  postCode: string;
  city: string;
  editHandler: (id) => void;
}

export interface CompanyAddressMutation {
  address: string;
  district: string;
  postCode: string;
  city: string;
}

export interface CompanyAddressEditRequest {
  id: string;
  data: CompanyAddressMutation;
}

export interface CompanyAddressResponse {
  message: string;
  addresses: CompanyAddress[];
}

export interface CompanyAddressOneResponse {
  message: string;
  address: CompanyAddress;
}
