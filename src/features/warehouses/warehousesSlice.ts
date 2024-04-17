import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Warehouse } from '../../types/types.Warehouses';
import { fetchWarehouseData } from './warehousesThunks';

interface WarehousesState {
  warehouses: Warehouse[];
  isLoading: boolean;
}

const initialState: WarehousesState = {
  warehouses: [],
  isLoading: false,
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
      state.warehouses = payload.warehouses;
      state.isLoading = false;
    });
    builder.addCase(fetchWarehouseData.rejected, (state) => {
      state.isLoading = false;
    });
  },
});
export const warehousesReducer = WarehouseSlice.reducer;
export const warehousesState = (state: RootState) =>
  state.warehouses.warehouses;
export const isWarehousesLoading = (state: RootState) =>
  state.warehouses.isLoading;
