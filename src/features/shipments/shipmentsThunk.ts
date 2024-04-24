import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  ShipmentMutation,
  ShipmentsResponse,
} from '../../types/types.Shipments';
import axiosApi from '../../utils/axiosApi';
import { serverRoute } from '../../utils/constants';

export const fetchShipments = createAsyncThunk<ShipmentsResponse>(
  'shipments/fetchAll',
  async () => {
    try {
      const response = await axiosApi.get<ShipmentsResponse>(
        serverRoute.shipments,
      );
      return response.data ?? [];
    } catch (e) {
      console.log('Caught on try - FETCH ALL SHIPMENTS ', e);
      throw e;
    }
  },
);

export const createShipment = createAsyncThunk<
  ShipmentMutation,
  ShipmentMutation
>('shipments/createShipment', async (shipmentMutation: ShipmentMutation) => {
  const response = await axiosApi.post<ShipmentMutation>(
    serverRoute.shipments,
    shipmentMutation,
  );
  return response.data;
});
