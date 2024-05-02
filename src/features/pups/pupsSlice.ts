import { Pup } from '../../types/types.Pup';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { createPup, editPup, fetchOnePup, fetchPups } from './pupsThunks';

interface PupsState {
  items: Pup[];
  item: Pup | null;
  creating: boolean;
  isEditing: boolean;
  fetchLoading: boolean;
  fetchOneLoading: boolean;
}

const initialState: PupsState = {
  items: [],
  item: null,
  creating: false,
  isEditing: false,
  fetchLoading: false,
  fetchOneLoading: false,
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
      .addCase(fetchOnePup.pending, (state) => {
        state.fetchOneLoading = true;
      })
      .addCase(fetchOnePup.fulfilled, (state, { payload: pup }) => {
        state.fetchOneLoading = false;
        state.item = pup;
      })
      .addCase(fetchOnePup.rejected, (state) => {
        state.fetchOneLoading = false;
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
  },
});

export const pupsReducer = pupsSlice.reducer;

export const selectPups = (state: RootState) => state.pups.items;
export const selectOnePup = (state: RootState) => state.pups.item;
export const selectPupsLoading = (state: RootState) => state.pups.fetchLoading;
export const selectPupCreating = (state: RootState) => state.pups.creating;
export const selectPupEditing = (state: RootState) => state.pups.isEditing;
export const selectPupOneLoading = (state: RootState) =>
  state.pups.fetchOneLoading;
