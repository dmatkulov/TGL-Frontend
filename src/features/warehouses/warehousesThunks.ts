import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../utils/axiosApi';
import { Warehouse } from '../../types/types.Warehouses';

export const fetchWarehouseData = createAsyncThunk<
  Warehouse[] | undefined,
  undefined
>('warehouse/fetchWarehouseData', async () => {
  const response = await axiosApi.get<Warehouse[]>('/warehouse');
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
