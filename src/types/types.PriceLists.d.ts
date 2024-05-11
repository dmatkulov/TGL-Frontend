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

export interface PriceListName {
  name: string;
}

export interface PriceListRangesInputData {
  rangeId: number;
  rangeName: string;
  rangeValue: number;
  valueId: number;
  valueName: string;
  valueValue: number;
}
