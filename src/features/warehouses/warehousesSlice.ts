import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Warehouse } from '../../types/types.Warehouses';

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
});
export const warehousesReducer = WarehouseSlice.reducer;
export const warehousesState = (state: RootState) =>
  state.warehouses.warehouses;
export const isWarehousesLoading = (state: RootState) =>
  state.warehouses.isLoading;
