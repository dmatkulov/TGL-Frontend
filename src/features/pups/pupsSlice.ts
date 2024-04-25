import { Pup } from '../../types/types.Pup';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { createPup, fetchPups } from './pupsThunks';

interface PupsState {
  items: Pup[];
  creating: boolean;
  fetchLoading: boolean;
}

const initialState: PupsState = {
  items: [],
  creating: false,
  fetchLoading: false,
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
  },
});

export const pupsReducer = pupsSlice.reducer;

export const selectPups = (state: RootState) => state.pups.items;
export const selectPupsLoading = (state: RootState) => state.pups.fetchLoading;
export const selectPupCreating = (state: RootState) => state.pups.creating;
