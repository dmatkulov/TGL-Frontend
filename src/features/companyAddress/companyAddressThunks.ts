import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../utils/axiosApi';
import { serverRoute } from '../../utils/constants';
import {
  CompanyAddressEditRequest,
  CompanyAddressMutation,
  CompanyAddressOneResponse,
  CompanyAddressResponse,
} from '../../types/types.CompanyAddress';

export const fetchCompanyAddresses = createAsyncThunk<
  CompanyAddressResponse | undefined
>('companyAddresses/fetchAll', async () => {
  try {
    const response = await axiosApi.get<CompanyAddressResponse>(
      serverRoute.companyAddresses,
    );
    return response.data;
  } catch (e) {
    console.log('Caught on try - FETCH ALL COMPANY ADDRESSES - ', e);
  }
});

export const fetchOneAddress = createAsyncThunk<
  CompanyAddressOneResponse,
  string
>('companyAddresses/fetchOne', async (id) => {
  try {
    const response = await axiosApi.get<CompanyAddressOneResponse>(
      `${serverRoute.companyAddresses}/${id}`,
    );
    return response.data;
  } catch (e) {
    console.log('Caught on try - FETCH ONE COMPANY ADDRESSES - ', e);
    throw e;
  }
});

export const uploadCompanyAddress = createAsyncThunk<
  void,
  CompanyAddressMutation
>('companyAddresses/upload', async (arg) => {
  try {
    const response = await axiosApi.post(serverRoute.companyAddressesAdd, arg);

    return response.data;
  } catch (e) {
    console.log('Caught on try - UPLOAD NEW ADDRESS ', e);
  }
});
export const deleteCompanyAddress = createAsyncThunk<void, string>(
  'companyAddresses/delete',
  async (arg) => {
    try {
      const response = await axiosApi.delete(
        `/company-addresses/${arg}/delete`,
      );
      return response.data;
    } catch (e) {
      console.log('Caught on try - UPLOAD NEW ADDRESS ', e);
    }
  },
);
export const updateCompanyAddress = createAsyncThunk<
  void,
  CompanyAddressEditRequest
>('companyAddresses/edit', async (arg) => {
  try {
    console.log('inside thunk ', arg);
    const response = await axiosApi.patch(
      serverRoute.companyAddresses + '/' + arg.id,
      arg,
    );
    return response.data;
  } catch (e) {
    console.log('Caught on try - UPLOAD NEW ADDRESS ', e);
  }
});
