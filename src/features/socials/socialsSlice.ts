import { createSlice } from '@reduxjs/toolkit';
import { Social } from '../../types/types.SocialsNetwork';
import { fetchSocials } from './socialsThunk';
import { RootState } from '../../app/store';

interface SocialsState {
  socials: Social[];
  social: Social;
  isLoading: boolean;
  isSingleSocialLoading: boolean;
  isUploading: boolean;
  isDeleting: boolean;
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
  isSingleSocialLoading: false,
  isUploading: false,
  isDeleting: false,
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

    // builder
    //   .addCase(fetchOneSocial.pending, (state) => {
    //     state.isLoadingDataSocial = true;
    //   })
    //   .addCase(fetchOneSocial.fulfilled, (state, { payload: current }) => {
    //     state.isLoadingDataSocial = false;
    //     state.social = current;
    //   })
    //   .addCase(fetchOneSocial.rejected, (state) => {
    //     state.isLoadingDataSocial = false;
    //   });
    //
    // builder
    //   .addCase(createSocials.pending, (state) => {
    //     state.isLoadingDataSocial = true;
    //   })
    //   .addCase(createSocials.fulfilled, (state) => {
    //     state.isLoadingDataSocial = false;
    //   })
    //   .addCase(createSocials.rejected, (state) => {
    //     state.isLoadingDataSocial = false;
    //   });
    // builder
    //   .addCase(deleteSocialNetwork.pending, (state) => {
    //     state.isDelete = true;
    //   })
    //   .addCase(deleteSocialNetwork.fulfilled, (state) => {
    //     state.isDelete = false;
    //   })
    //   .addCase(deleteSocialNetwork.rejected, (state) => {
    //     state.isDelete = false;
    //   });
  },
});

export const socialReducer = socialsSlice.reducer;
export const socialsState = (state: RootState) => state.socials.socials;
export const singleSocialState = (state: RootState) => state.socials.social;

export const isSocialsLoading = (state: RootState) => state.socials.isLoading;
export const isSingleSocialLoading = (state: RootState) =>
  state.socials.isSingleSocialLoading;
// export const selectSocials = (state: RootState) => state.socials.socials;
// export const selectSocial = (state: RootState) => state.socials.social;
// export const isPostLoadingSocials = (state: RootState) =>
//   state.socials.isLoadingDataSocial;
// export const isDeleteSocialNetwork = (state: RootState) =>
//   state.socials.isDelete;
// export const isEditing = (state: RootState) => state.socials.isEditing;
