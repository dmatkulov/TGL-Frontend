import { createAsyncThunk } from '@reduxjs/toolkit';
import { PupMutation, PupResponse } from '../../types/types.Pup';
import { serverRoute } from '../../utils/constants';
import axiosApi from '../../utils/axiosApi';

export const fetchPups = createAsyncThunk<PupResponse | undefined>(
  'pups/fetchAll',
  async () => {
    try {
      const response = await axiosApi.get<PupResponse>(serverRoute.pups);
      return response.data ?? [];
    } catch (e) {
      console.log('Caught on try - FETCH ALL PUPS ', e);
    }
  },
);

export const createPup = createAsyncThunk<void, PupMutation>(
  'pups/create',
  async (pupMutation) => {
    return await axiosApi.post(serverRoute.pups, pupMutation);
  },
);
