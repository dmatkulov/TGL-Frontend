import { createSlice } from '@reduxjs/toolkit';
import { ShipmentData, ShipmentsResponse } from '../../types/types.Shipments';
import {
  createShipment,
  deleteShipment,
  editShipment,
  fetchShipments,
  fetchShipmentsByQuery,
  fetchShipmentsByUser,
  updateShipmentStatus,
} from './shipmentsThunk';
import { RootState } from '../../app/store';
import { toast } from 'react-toastify';

interface shipmentsState {
  shipments: ShipmentData[];
  shipmentsLoading: boolean;
  shipmentsError: boolean;
  addShipment: ShipmentsResponse | null;
  addShipmentLoading: boolean;
  addShipmentError: boolean;
  isDelete: boolean;
  isEditing: boolean;
}

const initialState: shipmentsState = {
  shipments: [],
  shipmentsLoading: false,
  shipmentsError: false,
  addShipment: null,
  addShipmentLoading: false,
  addShipmentError: false,
  isDelete: false,
  isEditing: false,
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
        state.addShipmentLoading = true;
        state.addShipmentError = false;
      })
      .addCase(createShipment.fulfilled, (state, { payload: data }) => {
        state.addShipmentLoading = false;
        state.addShipment = data;
        if (data.message) {
          toast.success(data.message);
        }
      })
      .addCase(createShipment.rejected, (state) => {
        state.addShipmentLoading = false;
        state.addShipmentError = true;
      });

    builder
      .addCase(fetchShipmentsByUser.pending, (state) => {
        state.shipmentsLoading = true;
      })
      .addCase(fetchShipmentsByUser.fulfilled, (state, { payload }) => {
        state.shipments = payload.shipments;
        state.shipmentsLoading = false;
      })
      .addCase(fetchShipmentsByUser.rejected, (state) => {
        state.shipmentsLoading = false;
        state.shipmentsError = true;
      });

    builder
      .addCase(fetchShipmentsByQuery.pending, (state) => {
        state.shipmentsLoading = true;
      })
      .addCase(fetchShipmentsByQuery.fulfilled, (state, { payload }) => {
        state.shipments = payload.shipments;
        state.shipmentsLoading = false;
      })
      .addCase(fetchShipmentsByQuery.rejected, (state) => {
        state.shipmentsLoading = false;
        state.shipmentsError = true;
      });

    builder
      .addCase(updateShipmentStatus.pending, (state) => {
        state.addShipmentLoading = true;
      })
      .addCase(updateShipmentStatus.fulfilled, (state) => {
        state.addShipmentLoading = false;
      })
      .addCase(updateShipmentStatus.rejected, (state) => {
        state.addShipmentLoading = false;
        state.addShipmentError = true;
      });

    builder
      .addCase(deleteShipment.pending, (state) => {
        state.isDelete = true;
      })
      .addCase(deleteShipment.fulfilled, (state) => {
        state.isDelete = false;
      })
      .addCase(deleteShipment.rejected, (state) => {
        state.isDelete = false;
      });

    builder
      .addCase(editShipment.pending, (state) => {
        state.isEditing = true;
      })
      .addCase(editShipment.fulfilled, (state, { payload: data }) => {
        state.isEditing = false;
        toast.success(data?.message);
      })
      .addCase(editShipment.rejected, (state) => {
        state.isEditing = false;
      });
  },
});

export const shipmentsReducer = shipmentsSlice.reducer;
export const selectShipments = (state: RootState) => state.shipments.shipments;
export const selectShipmentsLoading = (state: RootState) =>
  state.shipments.shipmentsLoading;

export const addShipmentGetLoad = (state: RootState) =>
  state.shipments.addShipmentLoading;
export const addShipmentGetError = (state: RootState) =>
  state.shipments.addShipmentError;
export const selectShipmentEditing = (state: RootState) =>
  state.shipments.isEditing;
export const selectShipmentDeleting = (state: RootState) =>
  state.shipments.isDelete;
