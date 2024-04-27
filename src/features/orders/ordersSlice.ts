import { Order } from '../../types/types.Order';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

interface OrdersState {
  items: Order[];
  fetchLoading: boolean;
  deliveryLoading: boolean;
  cancelLoading: boolean;
  openModal: boolean;
  idToModal: string;
}

const initialState: OrdersState = {
  items: [],
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
});

export const ordersReducer = ordersSlice.reducer;
export const { toggleModal } = ordersSlice.actions;
export const selectOrders = (state: RootState) => state.orders.items;
export const selectOrdersLoading = (state: RootState) =>
  state.orders.fetchLoading;
export const selectOrdersDeliveryLoading = (state: RootState) =>
  state.orders.deliveryLoading;
export const selectOrdersCancelLoading = (state: RootState) =>
  state.orders.cancelLoading;
export const selectOrderModal = (state: RootState) => state.orders.openModal;
export const idToModalState = (state: RootState) => state.orders.idToModal;
