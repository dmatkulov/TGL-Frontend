import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  GlobalError,
  IStaff,
  Staff,
  UpdateUserArg,
  ValidationError,
} from '../../types/types';
import axiosApi from '../../utils/axiosApi';
import { serverRoute } from '../../utils/constants';
import { isAxiosError } from 'axios';
import { RootState } from '../../app/store';
import { unsetUser } from './usersSlice';
import { ProfileMutation } from '../../types/types.Profile';
import {LoginMutation, RegisterMutation, RegisterResponse} from '../../types/types.User';

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
    const response = await axiosApi.put(
      `${serverRoute.users}/update`,
      profileMutation,
    );
    return response.data;
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 422) {
      return rejectWithValue(e.response.data);
    }

    throw e;
  }
});

export const createStaff = createAsyncThunk<null, IStaff>(
  'users/staff',
  async (staffMutation) => {
    return await axiosApi.post(serverRoute.staff, staffMutation);
  },
);

export const getStaff = createAsyncThunk<Staff, string>(
  'users/getStaff',
  async (id) => {
    const staffResponse = await axiosApi.get<Staff>('/users/' + id);
    return staffResponse.data;
  },
);

export const updateStaff = createAsyncThunk<void, UpdateUserArg>(
  'users/updateStaff',
  async (userId, userMutation) => {
    return await axiosApi.put(
      `${serverRoute.users}/update/${userId}`,
      userMutation,
    );
  },
);

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
