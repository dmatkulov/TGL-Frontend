import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../utils/axiosApi';
import { Warehouse, WarehouseResponse } from '../../types/types.Warehouses';

export const fetchWarehouseData = createAsyncThunk<
  WarehouseResponse | undefined,
  undefined
>('warehouse/fetchWarehouseData', async () => {
  const response = await axiosApi.get<WarehouseResponse>('/warehouse');
  if (response) {
    return response.data;
  }
  return;
});

export const createWarehouse = createAsyncThunk<void, Warehouse>(
  'warehouse/createWarehouse',
  async (data) => {
    await axiosApi.post('/warehouse/add', data);
  },
);
