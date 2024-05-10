export interface Range {
  name: string;
  value: string;
}
export interface PriceList {
  _id: string;
  name: string;
  ranges: Range[];
}
