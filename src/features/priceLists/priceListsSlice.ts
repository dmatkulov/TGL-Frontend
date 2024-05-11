import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { PriceList } from '../../types/types.PriceLists';
import { fetchAllPriceLists, uploadPriceList } from './priceListsThunks';

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
  isEmpty: false,
};

const priceListsSlice = createSlice({
  name: 'priceLists',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPriceLists.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllPriceLists.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        const check = payload.priceLists.length < 1;
        check ? (state.isEmpty = true) : (state.isEmpty = false);
        state.priceLists = payload.priceLists;
      })
      .addCase(fetchAllPriceLists.rejected, (state) => {
        state.isLoading = false;
      });
    builder
      .addCase(uploadPriceList.pending, (state) => {
        state.isUploading = true;
      })
      .addCase(uploadPriceList.fulfilled, (state) => {
        state.isUploading = false;
      })
      .addCase(uploadPriceList.rejected, (state) => {
        state.isUploading = false;
      });
  },
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
export const isPriceListsEmpty = (state: RootState) => state.priceLists.isEmpty;
