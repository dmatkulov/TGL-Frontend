import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { CompanyAddress } from '../../types/types.CompanyAddress';
import {
  deleteCompanyAddress,
  fetchCompanyAddresses,
  uploadCompanyAddress,
} from './companyAddressThunks';

interface CompanyAddressesState {
  addresses: CompanyAddress[];
  isLoading: boolean;
  isCreating: boolean;
  isDeleting: boolean;
}

const initialState: CompanyAddressesState = {
  addresses: [],
  isLoading: false,
  isCreating: false,
  isDeleting: false,
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
    builder.addCase(uploadCompanyAddress.pending, (state) => {
      state.isCreating = true;
    });
    builder.addCase(uploadCompanyAddress.fulfilled, (state) => {
      state.isCreating = false;
    });
    builder.addCase(uploadCompanyAddress.rejected, (state) => {
      state.isCreating = false;
    });
    builder.addCase(deleteCompanyAddress.pending, (state) => {
      state.isDeleting = true;
    });
    builder.addCase(deleteCompanyAddress.fulfilled, (state) => {
      state.isDeleting = false;
    });
    builder.addCase(deleteCompanyAddress.rejected, (state) => {
      state.isDeleting = false;
    });
  },
});

export const companyAddressReducer = companyAddressesSlice.reducer;
export const companyAddressState = (state: RootState) =>
  state.companyAddress.addresses;
export const isCompanyAddressesLoading = (state: RootState) =>
  state.companyAddress.isLoading;
export const isCompanyAddressesCreating = (state: RootState) =>
  state.companyAddress.isCreating;
export const isCompanyAddressesDeleting = (state: RootState) =>
  state.companyAddress.isDeleting;
