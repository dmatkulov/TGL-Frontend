import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { PriceList } from '../../types/types.PriceLists';

interface PriceListsState {
  priceLists: PriceList[];
  isLoading: boolean;
  isUploading: boolean;
  isDeleting: boolean;
  isEmpty: boolean;
}

const initialState: PriceListsState = {
  priceLists: [],
  isLoading: false,
  isUploading: false,
  isDeleting: false,
  isEmpty: true,
};

const priceListsSlice = createSlice({
  name: 'priceLists',
  initialState,
  reducers: {},
});

export const priceListsReducer = priceListsSlice.reducer;
export const priceListsState = (state: RootState) =>
  state.priceLists.priceLists;
export const isPriceListsLoading = (state: RootState) =>
  state.priceLists.isLoading;
export const isPriceListsDeleting = (state: RootState) =>
  state.priceLists.isDeleting;
export const isPriceListsUploading = (state: RootState) =>
  state.priceLists.isUploading;
