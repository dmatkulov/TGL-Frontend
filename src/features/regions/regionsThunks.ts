import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../utils/axiosApi';
import { RegionResponse } from '../../types/types.Regions';

export const fetchRegions = createAsyncThunk<RegionResponse | undefined>(
  'regions/fetch',
  async () => {
    try {
      const response = await axiosApi.get<RegionResponse>('/regions');
      if (response) {
        return response.data;
      }
      return undefined;
    } catch (e) {
      console.log('Caught on try - FETCH REGIONS - ', e);
    }
  },
);
