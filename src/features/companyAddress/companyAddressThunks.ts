import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../utils/axiosApi';
import { serverRoute } from '../../utils/constants';
import {
  CompanyAddressMutation,
  CompanyAddressResponse,
} from '../../types/types.CompanyAddress';

export const fetchCompanyAddresses = createAsyncThunk<
  CompanyAddressResponse | undefined
>('companyAddresses/fetchAll', async () => {
  try {
    const response = await axiosApi.get<CompanyAddressResponse>(
      serverRoute.companyAddresses,
    );
    if (response.data) {
      return response.data;
    }
  } catch (e) {
    console.log('Caught on try - FETCH ALL COMPANY ADDRESSES - ', e);
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
