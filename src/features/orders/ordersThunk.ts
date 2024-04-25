import { createAsyncThunk } from '@reduxjs/toolkit';
import { OrdersResponse } from '../../types/types.Order';
import axiosApi from '../../utils/axiosApi';
import { serverRoute } from '../../utils/constants';

export const fetchOrders = createAsyncThunk<OrdersResponse, string>(
  'shipments/fetchAll',
  async (marketId) => {
    try {
      const response = await axiosApi.get<OrdersResponse>(
        `${serverRoute.shipments}?marketId=${marketId}`,
      );
      return response.data ?? [];
    } catch (e) {
      console.log('Caught on try - FETCH ALL ORDERS ', e);
      throw e;
    }
  },
);

export const deleteOrder = createAsyncThunk<OrdersResponse, string>(
  'shipments/delete',
  async (orderId) => {
    try {
      const response = await axiosApi.delete<OrdersResponse>(
        `${serverRoute.shipments}/${orderId}`,
      );
      return response.data ?? [];
    } catch (e) {
      console.log('Caught on try - DELETE ORDER ', e);
      throw e;
    }
  },
);
