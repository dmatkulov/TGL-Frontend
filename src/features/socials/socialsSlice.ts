import { createSlice } from '@reduxjs/toolkit';
import { Social } from '../../types/types.SocialsNetwork';
import {
  addSocial,
  fetchOneSocial,
  fetchSocials,
  updateSocial,
} from './socialsThunk';
import { RootState } from '../../app/store';

interface SocialsState {
  socials: Social[];
  social: Social;
  isLoading: boolean;
  isSingleLoading: boolean;
  isUploading: boolean;
}

const initialState: SocialsState = {
  socials: [],
  social: {
    _id: '',
    name: '',
    link: '',
    image: '',
  },
  isLoading: false,
  isSingleLoading: false,
  isUploading: false,
};

export const socialsSlice = createSlice({
  name: 'socials',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSocials.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchSocials.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        if (payload) {
          state.socials = payload.socials;
        }
      })
      .addCase(fetchSocials.rejected, (state) => {
        state.isLoading = false;
      });
    builder
      .addCase(addSocial.pending, (state) => {
        state.isUploading = true;
      })
      .addCase(addSocial.fulfilled, (state) => {
        state.isUploading = false;
      })
      .addCase(addSocial.rejected, (state) => {
        state.isUploading = false;
      });

    builder
      .addCase(fetchOneSocial.pending, (state) => {
        state.isSingleLoading = true;
        console.log('slice pending', state.isSingleLoading);
      })
      .addCase(fetchOneSocial.fulfilled, (state, { payload: current }) => {
        state.social = current;
        state.isSingleLoading = false;
        console.log('slice ff', state.isSingleLoading);
      })
      .addCase(fetchOneSocial.rejected, (state) => {
        state.isSingleLoading = false;
        console.log('slice r', state.isSingleLoading);
      });
    builder
      .addCase(updateSocial.pending, (state) => {
        state.isUploading = true;
      })
      .addCase(updateSocial.fulfilled, (state) => {
        state.isUploading = false;
      })
      .addCase(updateSocial.rejected, (state) => {
        state.isUploading = false;
      });
  },
});

export const socialReducer = socialsSlice.reducer;
export const socialsState = (state: RootState) => state.socials.socials;
export const singleSocialState = (state: RootState) => state.socials.social;
export const isSocialUploading = (state: RootState) =>
  state.socials.isUploading;
export const isSocialsLoading = (state: RootState) => state.socials.isLoading;
export const isSingleSocialLoading = (state: RootState) =>
  state.socials.isSingleLoading;
