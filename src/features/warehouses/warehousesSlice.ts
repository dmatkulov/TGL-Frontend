import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Warehouse } from '../../types/types.Warehouses';
import { createWarehouse, fetchWarehouseData } from './warehousesThunks';

interface WarehousesState {
  warehouses: Warehouse[];
  isLoading: boolean;
  isCreateLoading: boolean;
}

const initialState: WarehousesState = {
  warehouses: [],
  isLoading: false,
  isCreateLoading: false,
};

const WarehouseSlice = createSlice({
  name: 'warehouse',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchWarehouseData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchWarehouseData.fulfilled, (state, { payload }) => {
      if (payload) {
        state.warehouses = payload.warehouses;
      }
      state.isLoading = false;
    });
    builder.addCase(fetchWarehouseData.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(createWarehouse.pending, (state) => {
      state.isCreateLoading = true;
    });
    builder.addCase(createWarehouse.fulfilled, (state) => {
      state.isCreateLoading = false;
    });
    builder.addCase(createWarehouse.rejected, (state) => {
      state.isCreateLoading = false;
    });
  },
});
export const warehousesReducer = WarehouseSlice.reducer;
export const warehousesState = (state: RootState) =>
  state.warehouses.warehouses;
export const isWarehousesLoading = (state: RootState) =>
  state.warehouses.isLoading;

export const isWarehousesCreateLoading = (state: RootState) =>
  state.warehouses.isCreateLoading;
