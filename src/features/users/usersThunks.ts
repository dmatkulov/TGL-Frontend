import { createAsyncThunk } from '@reduxjs/toolkit';
import { GlobalErrorMessage, ValidationError } from '../../types/types';
import axiosApi from '../../utils/axiosApi';
import { serverRoute } from '../../utils/constants';
import { isAxiosError } from 'axios';
import { RootState } from '../../app/store';
import { unsetUser } from './usersSlice';
import { ProfileMutation } from '../../types/types.Profile';
import {
  ClientResponse,
  ClientsResponse,
  IStaff,
  IStaffResponse,
  IStaffResponseData,
  LoginLastSessionMutation,
  LoginMutation,
  RegisterMutation,
  RegisterResponse,
  UpdateUserArg,
  UsersRequestParams,
} from '../../types/types.User';

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
    await axiosApi.post(serverRoute.staff, staffMutation);
    return null;
  },
);

export const getStaffData = createAsyncThunk<
  IStaffResponseData,
  UsersRequestParams | undefined,
  { state: RootState }
>('users/getStaffData', async (params, { rejectWithValue }) => {
  try {
    const queryParams: Record<string, string | undefined> = {};
    if (params) {
      if (params.region) queryParams.region = params.region;
      if (params.settlement) queryParams.settlement = params.settlement;
      if (params.role) queryParams.role = params.role;
    }

    const response = await axiosApi.get<IStaffResponseData>('/users', {
      params: queryParams,
    });

    const roles = response.data.users.map((user) => user.role);
    const hasAllRoles =
      roles.includes('admin') &&
      roles.includes('manager') &&
      roles.includes('client') &&
      roles.includes('super');

    if (hasAllRoles) {
      const sortedData = response.data.users.sort((a, b) => {
        const rolesOrder: Record<string, number> = {
          admin: 0,
          manager: 1,
          client: 2,
          super: 3,
        };
        return rolesOrder[a.role] - rolesOrder[b.role];
      });
      return { message: response.data.message, users: sortedData };
    } else {
      return response.data;
    }
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 422) {
      return rejectWithValue(e.response.data);
    }

    throw e;
  }
});

export const getStaff = createAsyncThunk<IStaffResponse, string>(
  'users/getStaff',
  async (id) => {
    const staffResponse = await axiosApi.get<IStaffResponse>('/users/' + id);
    return staffResponse.data;
  },
);

export const updateStaff = createAsyncThunk<void, UpdateUserArg>(
  'users/updateStaff',
  async ({ userId, userMutation }) => {
    try {
      await axiosApi.patch(
        `${serverRoute.users}/update/${userId}`,
        userMutation,
      );
    } catch (e) {
      console.log(e);
    }
  },
);

export const login = createAsyncThunk<
  RegisterResponse,
  LoginMutation,
  { rejectValue: GlobalErrorMessage }
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

export const loginByLastSession = createAsyncThunk<
  RegisterResponse,
  LoginLastSessionMutation,
  { rejectValue: GlobalErrorMessage }
>(
  'users/loginByLastSession',
  async (LoginLastSessionMutation, { rejectWithValue }) => {
    try {
      const response = await axiosApi.post<RegisterResponse>(
        serverRoute.lastSession,
        LoginLastSessionMutation,
      );
      return response.data;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 422) {
        return rejectWithValue(e.response.data);
      }

      throw e;
    }
  },
);

export const logout = createAsyncThunk<void, undefined>(
  'users/logout',
  async (_, { dispatch }) => {
    await axiosApi.delete(serverRoute.sessions);
    dispatch(unsetUser());
  },
);

export const fetchClients = createAsyncThunk<ClientsResponse | undefined>(
  'users/fetchClients',
  async () => {
    try {
      const response = await axiosApi.get<ClientsResponse>(serverRoute.clients);
      return response.data;
    } catch (e) {
      console.log('Caught on try - FETCH CLIENTS - ', e);
    }
  },
);
export const fetchSingleClient = createAsyncThunk<
  ClientResponse | undefined,
  string
>('users/fetchSingleClient', async (arg) => {
  try {
    console.log(arg);
    const response = await axiosApi.get<ClientResponse>(
      serverRoute.clients + '?marketId=' + arg,
    );
    return response.data;
  } catch (e) {
    console.log('Caught on try - FETCH SINGLE CLIENT - ', e);
  }
});
