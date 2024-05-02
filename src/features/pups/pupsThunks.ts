import { createAsyncThunk } from '@reduxjs/toolkit';
import { PupMutation, PupResponse, UpdatePupArg } from '../../types/types.Pup';
import { serverRoute } from '../../utils/constants';
import axiosApi from '../../utils/axiosApi';

export const fetchPups = createAsyncThunk<
  PupResponse | undefined,
  string | undefined
>('pups/fetchAll', async (region?: string) => {
  try {
    let url = serverRoute.pups;
    if (region) {
      url = `${serverRoute.pups}?region=${region}`;
    }
    const response = await axiosApi.get<PupResponse>(url);
    return response.data ?? [];
  } catch (e) {
    console.log('Caught on try - FETCH ALL PUPS ', e);
  }
});

export const editPup = createAsyncThunk<void, UpdatePupArg>(
  'pups/edit',
  async ({ pupId, pupMutation }) => {
    return await axiosApi.put(`${serverRoute.pups}/${pupId}`, pupMutation);
  },
);

export const createPup = createAsyncThunk<void, PupMutation>(
  'pups/create',
  async (pupMutation) => {
    return await axiosApi.post(serverRoute.pups, pupMutation);
  },
);
