import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../utils/axiosApi';
import { serverRoute } from '../../utils/constants';
import { Banned, BannedResponse } from '../../types/types.Banned';

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
export const deleteBanned = createAsyncThunk<void, string>(
  'banned/delete',
  async (arg) => {
    try {
      await axiosApi.delete(serverRoute.banned + '/' + arg);
    } catch (e) {
      console.log('Caught on try - DELETE BANNED - ', e);
    }
  },
);

export const uploadBanned = createAsyncThunk<void, string>(
  'banned/upload',
  async (arg) => {
    try {
      await axiosApi.post(serverRoute.banned, { name: arg });
    } catch (e) {
      console.log('Caught on try - UPLOAD BANNED - ', e);
    }
  },
);

export const updateBanned = createAsyncThunk<void, Banned>(
  'banned/update',
  async (arg) => {
    try {
      console.log(arg);

      const { _id, name } = arg;

      await axiosApi.patch(serverRoute.banned + '/' + _id, { name: name });
    } catch (e) {
      console.log('Caught on try - UPDATE BANNED - ', e);
    }
  },
);
