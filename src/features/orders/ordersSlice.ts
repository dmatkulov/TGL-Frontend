import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import {
  fetchShipmentsHistoryByUser,
  searchByTrack,
} from '../shipments/shipmentsThunk';
import { ShipmentData, ShipmentThatDone } from '../../types/types.Shipments';

interface OrdersState {
  items: ShipmentThatDone[];
  oneItem: ShipmentData | null;
  fetchLoading: boolean;
  deliveryLoading: boolean;
  cancelLoading: boolean;
  openModal: boolean;
  idToModal: string;
}

const initialState: OrdersState = {
  items: [],
  oneItem: null,
  fetchLoading: false,
  deliveryLoading: false,
  cancelLoading: false,
  openModal: false,
  idToModal: '',
};

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    toggleModal: (state, { payload: action }) => {
      const { toggle, id } = action;
      state.openModal = toggle;
      state.idToModal = id?._id;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchByTrack.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(searchByTrack.fulfilled, (state, { payload }) => {
        state.fetchLoading = false;
        state.oneItem = payload.shipment;
      })
      .addCase(searchByTrack.rejected, (state) => {
        state.fetchLoading = false;
      });
    builder
      .addCase(fetchShipmentsHistoryByUser.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(fetchShipmentsHistoryByUser.fulfilled, (state, { payload }) => {
        state.fetchLoading = false;
        state.items = payload.shipments;
      })
      .addCase(fetchShipmentsHistoryByUser.rejected, (state) => {
        state.fetchLoading = false;
      });
  },
});

export const ordersReducer = ordersSlice.reducer;
export const { toggleModal } = ordersSlice.actions;
export const selectOrders = (state: RootState) => state.orders.items;
export const selectOneOrder = (state: RootState) => state.orders.oneItem;
export const selectOrdersLoading = (state: RootState) =>
  state.orders.fetchLoading;
export const selectOrdersDeliveryLoading = (state: RootState) =>
  state.orders.deliveryLoading;
export const selectOrdersCancelLoading = (state: RootState) =>
  state.orders.cancelLoading;
export const selectOrderModal = (state: RootState) => state.orders.openModal;
export const idToModalState = (state: RootState) => state.orders.idToModal;
