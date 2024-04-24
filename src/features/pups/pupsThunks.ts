import { createAsyncThunk } from '@reduxjs/toolkit';
import { PupMutation, PupResponse } from '../../types/typePup';
import { serverRoute } from '../../utils/constants';
import axiosApi from '../../utils/axiosApi';

export const fetchPups = createAsyncThunk<PupResponse>(
  'pups/fetchAll',
  async () => {
    const response = await axiosApi.get<PupResponse>(serverRoute.pups);
    return response.data ?? [];
  },
);

export const createPup = createAsyncThunk<void, PupMutation>(
  'pups/create',
  async (pupMutation) => {
    return await axiosApi.post(serverRoute.pups, pupMutation);
  },
);
