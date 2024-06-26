import { createAsyncThunk } from '@reduxjs/toolkit';
import { CombinedData, PriceListsResponse } from '../../types/types.PriceLists';
import axiosApi from '../../utils/axiosApi';

export const fetchAllPriceLists = createAsyncThunk<PriceListsResponse>(
  'priceLists/fetchAll',
  async () => {
    try {
      const response = await axiosApi.get('/price-lists');
      return response.data;
    } catch (e) {
      console.log('Caught on try - FETCH ALL PRICE LISTS - ', e);
    }
  },
);

export const uploadPriceList = createAsyncThunk<
  PriceListsResponse,
  CombinedData
>('priceLists/upload', async (arg) => {
  try {
    const response = await axiosApi.post('/price-lists', arg);
    return response.data;
  } catch (e) {
    console.log('Caught on try - UPLOAD PRICE LIST - ', e);
  }
});

export const deletePriceList = createAsyncThunk<void, string>(
  'priceList/delete',
  async (arg) => {
    try {
      const response = await axiosApi.delete(`/price-lists/${arg}`);
      return response.data;
    } catch (e) {
      console.log('Caught on try - DELETE PRICE LIST - ', e);
    }
  },
);
