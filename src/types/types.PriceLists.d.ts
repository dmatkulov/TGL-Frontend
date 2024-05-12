import { ChangeEvent } from 'react';

export interface Range {
  range: string;
  value: number;
}

export interface PriceList {
  _id: string;
  name: string;
  ranges: Range[];
}

export interface CombinedData {
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
  rangeValue: string;
  valueId: number;
  valueName: string;
  valueValue: number;
  rangeChangeHandler: (e: ChangeEvent<HTMLInputElement>) => void;
  valueChangeHandler: (e: ChangeEvent<HTMLInputElement>) => void;
  deleteHandler: (nameId: number) => void;
}
