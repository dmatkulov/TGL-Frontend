import { createAsyncThunk } from '@reduxjs/toolkit';
import { WarehouseResponse } from '../../types/types';
import axiosApi from '../../utils/axiosApi';

export const fetchWarehouseData = createAsyncThunk<
  WarehouseResponse,
  undefined
>('users/fetchWarehouseData', async () => {
  const response = await axiosApi.get<WarehouseResponse>('/warehouse');
  return response.data;
});
