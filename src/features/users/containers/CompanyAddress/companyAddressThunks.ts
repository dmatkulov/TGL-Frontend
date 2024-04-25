import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../../../utils/axiosApi';
import { serverRoute } from '../../../../utils/constants';
import { CompanyAddressResponse } from '../../../../types/types.CompanyAddress';

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
