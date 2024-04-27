import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../utils/axiosApi';
import {UpdateWarehouseArg, Warehouse, WarehouseMutation, WarehouseResponse} from '../../types/types.Warehouses';

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


export const fetchOneWarehouse = createAsyncThunk<Warehouse, string>(
  'warehouse/fetchOne',
  async(id) => {
    const warehouseResponse = await axiosApi.get<Warehouse>(`/warehouse/${id}`);
    return warehouseResponse.data;
  }
);

export const createWarehouse = createAsyncThunk<void, WarehouseMutation>(
  'warehouse/createWarehouse',
  async (data) => {
    await axiosApi.post('/warehouse/add', data);
  },
);

export const updateWarehouse = createAsyncThunk<void, UpdateWarehouseArg>(
  'warehouse/update',
  async({warehouseId,warehouseMutation}) => {
    return axiosApi.patch(  `/warehouse/${warehouseId}`, warehouseMutation);
  }
);

