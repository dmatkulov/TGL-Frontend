import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../utils/axiosApi';
import { serverRoute } from '../../utils/constants';
import {
  Price,
  PriceMutation,
  PriceResponse,
  UpdatePriceArg,
} from '../../types/types.Price';

export const fetchPrice = createAsyncThunk<Price>(
  'prices/fetchPrice',
  async () => {
    const response = await axiosApi.get<Price>(serverRoute.prices);
    return response.data;
  },
);

export const createPrice = createAsyncThunk<PriceResponse, PriceMutation>(
  'prices/createPrice',
  async (priceMutation) => {
    const response = await axiosApi.post<PriceResponse>(
      serverRoute.prices,
      priceMutation,
    );
    return response.data;
  },
);

export const updatePrice = createAsyncThunk<void, UpdatePriceArg>(
  'prices/update',
  async ({ id, priceMutation }) => {
    await axiosApi.put(`${serverRoute.prices}/${id}`, priceMutation);
  },
);
