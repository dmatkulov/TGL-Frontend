import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../utils/axiosApi';
import { serverRoute } from '../../utils/constants';
import { BannedResponse } from '../../types/types.Banned';

export const fetchBanned = createAsyncThunk<BannedResponse | undefined>(
  'banned/fetch',
  async () => {
    try {
      const response = await axiosApi.get<BannedResponse>(serverRoute.banned);
      return response.data;
    } catch (e) {
      console.log('Caught on try - FETCH BANNED - ', e);
    }
  },
);
