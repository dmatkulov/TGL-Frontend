import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  ShipmentData,
  ShipmentMutation,
  ShipmentsResponse,
  oneShipmentResponse,
} from '../../types/types.Shipments';
import axiosApi from '../../utils/axiosApi';
import { serverRoute } from '../../utils/constants';
import { DeliveryData } from '../../types/types.Order';

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
  ShipmentsResponse,
  ShipmentMutation
>('shipments/createShipment', async (shipment) => {
  const response = await axiosApi.post(serverRoute.shipments, shipment);
  return response.data;
});

export const fetchShipmentsByUser = createAsyncThunk<ShipmentsResponse, string>(
  'shipments/fetchByUser',
  async (arg) => {
    try {
      const response = await axiosApi.get(
        serverRoute.shipments + '?marketId=' + arg,
      );
      return response.data ?? [];
    } catch (e) {
      console.log('Caught on try - FETCH SHIPMENTS BY USER - ', e);
    }
  },
);

export const fetchShipmentsByRegionAndPup = createAsyncThunk<
  ShipmentsResponse,
  { pupId: string; datetime: string }
>('shipments/fetchShipmentsByRegionAndPup', async (arg) => {
  try {
    const response = await axiosApi.get<ShipmentsResponse>(
      serverRoute.shipments + `?pupId=${arg.pupId}&datetime=${arg.datetime}`,
    );
    return response.data ?? [];
  } catch (e) {
    console.log('Caught on try - FETCH ALL SHIPMENTS ', e);
    throw e;
  }
});

export const orderDelivery = createAsyncThunk<void, DeliveryData>(
  'shipments/orderDelivery',
  async (arg) => {
    try {
      await axiosApi.patch(
        serverRoute.shipments + `/${arg._id}/` + 'toggleDelivery',
        arg,
      );
    } catch (e) {
      console.log('Caught on try - ORDER DELIVERY - ', e);
    }
  },
);

export const searchByTrack = createAsyncThunk<oneShipmentResponse, string>(
  'shipments/searchOne',
  async (trackerNumber) => {
    try {
      const response = await axiosApi.get<oneShipmentResponse>(
        serverRoute.shipments + '?orderByTrackingNumber=' + trackerNumber,
      );
      return response.data ?? [];
    } catch (e) {
      console.log('Caught on try - SEARCH ONE ORDER - ', e);
      throw e;
    }
  },
);

export const fetchShipmentsHistoryByUser = createAsyncThunk<
  ShipmentsResponse,
  string
>('shipments/fetchHistoryByUser', async (arg) => {
  try {
    const response = await axiosApi.get(
      serverRoute.shipments + '?marketId=' + arg + '&status=ЗАВЕРШЕН',
    );
    return response.data ?? [];
  } catch (e) {
    console.log('Caught on try - FETCH SHIPMENTS HISTORY BY USER - ', e);
  }
});

export const updateShipmentStatus = createAsyncThunk<
  ShipmentsResponse,
  ShipmentData
>('companyAddresses/edit', async (ShipmentData) => {
  try {
    const response = await axiosApi.put(
      serverRoute.shipments + '/' + ShipmentData._id,
      ShipmentData,
    );
    return response.data;
  } catch (e) {
    console.log('Caught on try - UPLOAD NEW ADDRESS ', e);
  }
});
