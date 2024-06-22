import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  ShipmentData,
  ShipmentMutation,
  ShipmentsResponse,
  oneShipmentResponse,
  ShipmentStatusData, UpdateShipmentArg,
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
      const shipments = response.data ?? [];

      shipments.shipments.sort((a, b) => {
        if (a.delivery.status && !b.delivery.status) {
          return -1;
        } else if (!a.delivery.status && !b.delivery.status) {
          return 1;
        } else {
          return 0;
        }
      });

      return shipments;
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

export const fetchShipmentsByRegion = createAsyncThunk<
  ShipmentsResponse,
  { region: string }
>('shipments/fetchShipmentsByRegion', async (arg) => {
  try {
    const response = await axiosApi.get<ShipmentsResponse>(
      serverRoute.shipments + `?region=${arg.region}`,
    );
    return response.data ?? [];
  } catch (e) {
    console.log('Caught on try - FETCH ALL SHIPMENT BY REGION ', e);
    throw e;
  }
});

export const fetchShipmentsByDatetime = createAsyncThunk<
  ShipmentsResponse,
  { datetime: string }
>('shipments/fetchShipmentsByDatetime', async (arg) => {
  try {
    const response = await axiosApi.get<ShipmentsResponse>(
      serverRoute.shipments + `?datetime=${arg.datetime}`,
    );
    return response.data ?? [];
  } catch (e) {
    console.log('Caught on try - FETCH ALL SHIPMENT BY DATETIME ', e);
    throw e;
  }
});

export const fetchShipmentsByRegionAndDatetime = createAsyncThunk<
  ShipmentsResponse,
  { region: string; datetime: string }
>('shipments/fetchShipmentsByRegionAndDatetime', async (arg) => {
  try {
    const response = await axiosApi.get<ShipmentsResponse>(
      serverRoute.shipments + `?region=${arg.region}&datetime=${arg.datetime}`,
    );
    return response.data ?? [];
  } catch (e) {
    console.log(
      'Caught on try - FETCH ALL SHIPMENT BY REGION AND DATETIME ',
      e,
    );
    throw e;
  }
});

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
>('shipments/edit', async (ShipmentData) => {
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

export const changeShipmentsStatus = createAsyncThunk<
  ShipmentsResponse,
  ShipmentStatusData[]
>('shipments/singleStatusUpdate', async (arg) => {
  try {
    const response = await axiosApi.patch(
      serverRoute.shipments + '/changeStatus',
      arg,
    );
    console.log('thun ', arg);
    return response.data;
  } catch (e) {
    console.log('Caught on try - CHANGE SINGLE SHIPMENT ', e);
  }
});

export const deleteShipment = createAsyncThunk<void, string>(
  'shipments/deleteShipment',
  async (id) => {
    const response = await axiosApi.delete(`${serverRoute.shipments}/${id}`);
    return response.data;
  }
);

export const editShipment = createAsyncThunk<void, UpdateShipmentArg>(
  'shipments/editShipment',
  async ({shipmentId, shipmentMutation}) => {
    return await axiosApi.put(`${serverRoute.shipments}/${shipmentId}`, shipmentMutation)
  }
);