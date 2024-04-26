import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../utils/axiosApi';
import { serverRoute } from '../../utils/constants';
import {
  PriceMutation,
  PriceResponse,
  UpdatePriceArg,
} from '../../types/types.Price';
import { GlobalErrorMessage } from '../../types/types';
import { isAxiosError } from 'axios';

export const fetchPrice = createAsyncThunk<PriceResponse>(
  'prices/fetchPrice',
  async () => {
    const response = await axiosApi.get<PriceResponse>(serverRoute.prices);
    return response.data;
  },
);

export const createPrice = createAsyncThunk<
  PriceResponse,
  PriceMutation,
  { rejectValue: GlobalErrorMessage }
>('prices/createPrice', async (priceMutation, { rejectWithValue }) => {
  try {
    const response = await axiosApi.post<PriceResponse>(
      serverRoute.prices,
      priceMutation,
    );
    return response.data;
  } catch (e) {
    if (isAxiosError(e) && e.response) {
      if (e.response.status === 422) {
        return rejectWithValue(e.response.data);
      }
    }
    throw e;
  }
});

export const updatePrice = createAsyncThunk<
  PriceResponse,
  UpdatePriceArg,
  { rejectValue: GlobalErrorMessage }
>('prices/update', async ({ id, priceMutation }, { rejectWithValue }) => {
  try {
export const updatePrice = createAsyncThunk<PriceResponse, UpdatePriceArg>(
  'prices/update',
  async ({ id, priceMutation }) => {
    const response = await axiosApi.put<PriceResponse>(
      `${serverRoute.prices}/${id}`,
      priceMutation,
    );
    return response.data;
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 422) {
      return rejectWithValue(e.response.data);
    }

    throw e;
  }
});
