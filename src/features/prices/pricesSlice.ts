import { Price } from '../../types/types.Price';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { createPrice, fetchPrice, updatePrice } from './pricesThunks';

interface PriceState {
  item: Price | null;
  fetchLoading: boolean;
  createLoading: boolean;
  priceResponse: string | null;
  priceFieldError: string | null;
  editLoading: boolean;
}

const initialState: PriceState = {
  item: null,
  fetchLoading: false,
  createLoading: false,
  priceResponse: null,
  priceFieldError: null,
  editLoading: false,
};

export const pricesSlice = createSlice({
  name: 'price',
  initialState,
  reducers: {
    setPriceFieldError: (state, { payload }) => {
      state.priceFieldError = payload;
    },
    unsetPriceMessage: (state) => {
      state.priceResponse = null;
      state.priceFieldError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPrice.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(fetchPrice.fulfilled, (state, { payload: priceResponse }) => {
        state.fetchLoading = false;
        state.item = priceResponse.price;
        state.priceResponse = priceResponse.message;
      })
      .addCase(fetchPrice.rejected, (state) => {
        state.fetchLoading = false;
      });

    builder
      .addCase(createPrice.pending, (state) => {
        state.createLoading = true;
      })
      .addCase(createPrice.fulfilled, (state, { payload: priceResponse }) => {
        state.createLoading = false;
        state.priceResponse = priceResponse.message;
      })
      .addCase(createPrice.rejected, (state) => {
        state.createLoading = false;
      });

    builder
      .addCase(updatePrice.pending, (state) => {
        state.editLoading = true;
      })
      .addCase(updatePrice.fulfilled, (state) => {
        state.editLoading = false;
      })
      .addCase(updatePrice.rejected, (state) => {
        state.editLoading = false;
      });
  },
});

export const pricesReducer = pricesSlice.reducer;
export const { setPriceFieldError, unsetPriceMessage } = pricesSlice.actions;
export const selectPrice = (state: RootState) => state.prices.item;
export const selectPriceLoading = (state: RootState) =>
  state.prices.fetchLoading;
export const selectPriceCreateLoading = (state: RootState) =>
  state.prices.createLoading;
export const selectPriceResponse = (state: RootState) =>
  state.prices.priceResponse;
export const selectPriceError = (state: RootState) =>
  state.prices.priceFieldError;
export const selectPriceEditLoading = (state: RootState) =>
  state.prices.editLoading;
