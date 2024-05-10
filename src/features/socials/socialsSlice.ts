import { createSlice } from '@reduxjs/toolkit';
import { SocialDataMutation, Socials } from '../../types/types.SocialsNetwork';
import { createSocials, deleteSocialNetwork, fetchSocials} from './socialsThunk';
import { RootState } from '../../app/store';


interface SocialsState {
  socials: Socials[],
  loadingSocials: boolean,
  errorLoadingSocials: boolean,
  isDelete: boolean,
  social: SocialDataMutation | null;
  isLoadingDataSocial: boolean;
  isErrorLoadDataSocial: boolean;
  isEditing: boolean,
}

const initialState: SocialsState = {
  socials: [],
  loadingSocials: false,
  errorLoadingSocials: false,
  isDelete: false,
  social:  null,
  isLoadingDataSocial: false,
  isErrorLoadDataSocial: false,
  isEditing: false,
};

export const socialsSlice = createSlice({
  name: 'socials',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSocials.pending, (state) => {
        state.loadingSocials = true;
        state.errorLoadingSocials = false;
      })
      .addCase(fetchSocials.fulfilled, (state, { payload }) => {
        state.loadingSocials = false;
        if (payload) {
          state.socials = payload.socials;
        }
      })
      .addCase(fetchSocials.rejected, (state) => {
        state.loadingSocials = false;
        state.errorLoadingSocials = true;
      });
    builder
      .addCase(createSocials.pending, (state) => {
        state.isLoadingDataSocial = true;
        state.isErrorLoadDataSocial = false;
      })
      .addCase(createSocials.fulfilled, (state,{payload: data}) => {
        state.isLoadingDataSocial = false;
        state.social = data;
      })
      .addCase(createSocials.rejected, (state) => {
        state.isLoadingDataSocial = false;
        state.isErrorLoadDataSocial = true;
      });
    builder
      .addCase(deleteSocialNetwork.pending, (state) => {
        state.isDelete = true;
      })
      .addCase(deleteSocialNetwork.fulfilled, (state) => {
        state.isDelete = false;
      })
      .addCase(deleteSocialNetwork.rejected, (state) => {
        state.isDelete = false;
      });

    // builder
    //   .addCase(updateSocialNetwork.pending, (state) => {
    //     state.isEditing = true;
    //   })
    //   .addCase(updateSocialNetwork.fulfilled, (state) => {
    //     state.isEditing = false;
    //   })
    //   .addCase(updateSocialNetwork.rejected, (state) => {
    //     state.isEditing = false;
    //   });
  },
});

export const socialReducer = socialsSlice.reducer;
export const selectSocials = (state: RootState) => state.socials.socials;
export const getLoadingSocials = (state: RootState) => state.socials.loadingSocials;
export const getErrorSocials = (state: RootState) => state.socials.loadingSocials;
export const isPostLoadingSocials = (state: RootState) => state.socials.isLoadingDataSocial;
export const isDeleteSocialNetwork = (state: RootState) => state.socials.isDelete;
export const isEditingSocialNetwork = (state: RootState) => state.socials.isEditing;