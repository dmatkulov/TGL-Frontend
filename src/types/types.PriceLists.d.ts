export interface Range {
  range: string;
  value: string;
}
export interface PriceList {
  _id: string;
  name: string;
  ranges: Range[];
}
export interface PriceListsResponse {
  message: string;
  priceLists: PriceList[];
}
