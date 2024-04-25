import { createSlice } from '@reduxjs/toolkit';
import { ShipmentData } from '../../types/types.Shipments';
import { createShipment, fetchShipments } from './shipmentsThunk';
import { RootState } from '../../app/store';

interface shipmentsState {
  shipments: ShipmentData[];
  shipmentsLoading: boolean;
  shipmentsError: boolean;
}

const initialState: shipmentsState = {
  shipments: [],
  shipmentsLoading: false,
  shipmentsError: false,
};

export const shipmentsSlice = createSlice({
  name: 'shipments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchShipments.pending, (state) => {
        state.shipmentsLoading = true;
      })
      .addCase(fetchShipments.fulfilled, (state, { payload }) => {
        state.shipmentsLoading = false;
        state.shipments = payload.shipments;
      })
      .addCase(fetchShipments.rejected, (state) => {
        state.shipmentsLoading = false;
        state.shipmentsError = true;
      });
    builder
      .addCase(createShipment.pending, (state) => {
        state.shipmentsLoading = true;
      })
      .addCase(createShipment.fulfilled, (state) => {
        state.shipmentsLoading = false;
      })
      .addCase(createShipment.rejected, (state) => {
        state.shipmentsLoading = false;
        state.shipmentsError = true;
      });
  },
});

export const shipmentsReducer = shipmentsSlice.reducer;
export const selectShipments = (state: RootState) => state.shipments.shipments;
export const selectShipmentsLoading = (state: RootState) =>
  state.shipments.shipmentsLoading;
export const selectShipmentsError = (state: RootState) =>
  state.shipments.shipmentsError;
