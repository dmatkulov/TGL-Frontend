import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../utils/axiosApi';
import { WarehouseResponse } from '../../types/types.Warehouses';

export const fetchWarehouseData = createAsyncThunk<
  WarehouseResponse,
  undefined
>('users/fetchWarehouseData', async () => {
  const response = await axiosApi.get<WarehouseResponse>('/warehouse');
  return response.data;
});
