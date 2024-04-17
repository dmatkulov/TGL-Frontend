import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  GlobalError,
  LoginMutation,
  RegisterMutation,
  RegisterResponse,
  ValidationError,
  WarehouseResponse,
} from '../../types/types';
import axiosApi from '../../utils/axiosApi';
import { serverRoute } from '../../utils/constants';
import { isAxiosError } from 'axios';
import { RootState } from '../../app/store';
import { unsetUser } from './usersSlice';
import { ProfileMutation } from '../../types/typeProfile';

export const register = createAsyncThunk<
  RegisterResponse,
  RegisterMutation,
  { rejectValue: ValidationError }
>('users/register', async (registerMutation, { rejectWithValue }) => {
  try {
    const response = await axiosApi.post(serverRoute.users, registerMutation);
    return response.data;
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 422) {
      return rejectWithValue(e.response.data);
    }

    throw e;
  }
});

export const update = createAsyncThunk<
  RegisterResponse,
  ProfileMutation,
  {
    rejectValue: ValidationError;
  }
>('users/update', async (profileMutation, { rejectWithValue }) => {
  try {
    const response = await axiosApi.put(serverRoute.users, profileMutation);
    return response.data;
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 422) {
      return rejectWithValue(e.response.data);
    }

    throw e;
  }
});

export const login = createAsyncThunk<
  RegisterResponse,
  LoginMutation,
  { rejectValue: GlobalError }
>('users/login', async (loginMutation, { rejectWithValue }) => {
  try {
    const response = await axiosApi.post<RegisterResponse>(
      serverRoute.sessions,
      loginMutation,
    );
    return response.data;
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 422) {
      return rejectWithValue(e.response.data);
    }

    throw e;
  }
});

export const logOut = createAsyncThunk<void, undefined, { state: RootState }>(
  'users/logout',
  async (_, { dispatch }) => {
    await axiosApi.delete(serverRoute.sessions);
    dispatch(unsetUser());
  },
);
