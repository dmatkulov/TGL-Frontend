import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../../../app/store';
import { CompanyAddress } from '../../../../types/types.CompanyAddress';
import { fetchCompanyAddresses } from './companyAddressThunks';

interface CompanyAddressesState {
  addresses: CompanyAddress[];
  isLoading: boolean;
}

const initialState: CompanyAddressesState = {
  addresses: [],
  isLoading: false,
};

const companyAddressesSlice = createSlice({
  name: 'companyAddress',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCompanyAddresses.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchCompanyAddresses.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      if (payload) {
        state.addresses = payload.addresses;
      }
    });
    builder.addCase(fetchCompanyAddresses.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const companyAddressReducer = companyAddressesSlice.reducer;
export const companyAddressState = (state: RootState) =>
  state.companyAddress.addresses;
export const isCompanyAddressesLoading = (state: RootState) =>
  state.companyAddress.isLoading;
