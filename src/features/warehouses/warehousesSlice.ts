import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Warehouse } from '../../types/types.Warehouses';
import {
  createWarehouse,
  deleteWarehouse,
  fetchOneWarehouse,
  fetchWarehouseData,
} from './warehousesThunks';

interface WarehousesState {
  warehouses: Warehouse[];
  warehouse: Warehouse | null;
  isLoading: boolean;
  fetchOneLoading: boolean;
  isCreateLoading: boolean;
  isDeleteLoad: string;
}

const initialState: WarehousesState = {
  warehouses: [],
  warehouse: null,
  isLoading: false,
  fetchOneLoading: false,
  isCreateLoading: false,
  isDeleteLoad: '',
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

    builder.addCase(fetchOneWarehouse.pending, (state) => {
      state.fetchOneLoading = true;
    });
    builder.addCase(
      fetchOneWarehouse.fulfilled,
      (state, { payload: current }) => {
        state.fetchOneLoading = false;
        state.warehouse = current;
      },
    );
    builder.addCase(fetchOneWarehouse.rejected, (state) => {
      state.fetchOneLoading = false;
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

    builder.addCase(deleteWarehouse.pending, (state) => {
      state.isDeleteLoad = '';
    });
    builder.addCase(deleteWarehouse.fulfilled, (state, action) => {
      state.isDeleteLoad = action.meta.arg || '';
    });
    builder.addCase(deleteWarehouse.rejected, (state) => {
      state.isDeleteLoad = '';
    });
  },
});
export const warehousesReducer = WarehouseSlice.reducer;
export const warehousesState = (state: RootState) =>
  state.warehouses.warehouses;

export const selectOneWarehouse = (state: RootState) =>
  state.warehouses.warehouse;
export const isWarehousesLoading = (state: RootState) =>
  state.warehouses.isLoading;
export const selectOneWarehouseFetching = (state: RootState) =>
  state.warehouses.fetchOneLoading;
export const isWarehousesCreateLoading = (state: RootState) =>
  state.warehouses.isCreateLoading;

export const isWarehousesDeleteLoading = (state: RootState) =>
  state.warehouses.isDeleteLoad;
