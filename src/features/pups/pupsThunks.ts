import { createAsyncThunk } from '@reduxjs/toolkit';
import { Pup } from '../../types/typePup';
import { serverRoute } from '../../utils/constants';
import axiosApi from '../../utils/axiosApi';

export const fetchPups = createAsyncThunk<Pup[]>('pups/fetchAll', async () => {
  const response = await axiosApi.get<Pup[]>(serverRoute.pups);
  return response.data ?? [];
});
