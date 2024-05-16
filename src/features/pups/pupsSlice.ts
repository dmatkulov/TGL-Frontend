import { Pup } from '../../types/types.Pup';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { createPup, deletePup, editPup, fetchPups } from './pupsThunks';

interface PupsState {
  items: Pup[];
  creating: boolean;
  isEditing: boolean;
  fetchLoading: boolean;
  isDelete: boolean;
}

const initialState: PupsState = {
  items: [],
  creating: false,
  isEditing: false,
  fetchLoading: false,
  isDelete: false,
};

export const pupsSlice = createSlice({
  name: 'pups',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPups.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(fetchPups.fulfilled, (state, { payload }) => {
        state.fetchLoading = false;
        if (payload) {
          state.items = payload.pups;
        }
      })
      .addCase(fetchPups.rejected, (state) => {
        state.fetchLoading = false;
      })

      .addCase(createPup.pending, (state) => {
        state.creating = true;
      })
      .addCase(createPup.fulfilled, (state) => {
        state.creating = false;
      })
      .addCase(createPup.rejected, (state) => {
        state.creating = false;
      });

    builder
      .addCase(editPup.pending, (state) => {
        state.isEditing = true;
      })
      .addCase(editPup.fulfilled, (state) => {
        state.isEditing = false;
      })
      .addCase(editPup.rejected, (state) => {
        state.isEditing = false;
      });

    builder
      .addCase(deletePup.pending, (state) => {
        state.isDelete = true;
      })
      .addCase(deletePup.fulfilled, (state) => {
        state.isDelete = false;
      })
      .addCase(deletePup.rejected, (state) => {
        state.isDelete = false;
      });
  },
});

export const pupsReducer = pupsSlice.reducer;

export const selectPups = (state: RootState) => state.pups.items;
export const selectPupsLoading = (state: RootState) => state.pups.fetchLoading;
export const selectPupCreating = (state: RootState) => state.pups.creating;
export const selectPupEditing = (state: RootState) => state.pups.isEditing;
export const isDeletePup = (state: RootState) => state.pups.isDelete;
