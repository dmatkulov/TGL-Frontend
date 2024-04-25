import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from '../../utils/axiosApi';
import {serverRoute} from '../../utils/constants';
import {PriceMutation, PriceResponse, UpdatePriceArg,} from '../../types/types.Price';

export const fetchPrice = createAsyncThunk<PriceResponse>(
  'prices/fetchPrice',
  async () => {
    const response = await axiosApi.get<PriceResponse>(serverRoute.prices);
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

export const updatePrice = createAsyncThunk<PriceResponse, UpdatePriceArg>(
  'prices/update',
  async ({ id, priceMutation }) => {
    const response = await axiosApi.put<PriceResponse>(`${serverRoute.prices}/${id}`, priceMutation);
    return response.data;
  },
);
