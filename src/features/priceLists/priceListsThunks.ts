import { createAsyncThunk } from '@reduxjs/toolkit';
import { PriceListsResponse } from '../../types/types.PriceLists';
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
