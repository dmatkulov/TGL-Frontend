import { Pup } from '../../types/typePup';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { fetchPups } from './pupsThunks';

interface PupsState {
  items: Pup[];
  fetchLoading: boolean;
}

const initialState: PupsState = {
  items: [],
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
      .addCase(fetchPups.fulfilled, (state, { payload: pups }) => {
        state.fetchLoading = false;
        state.items = pups;
      })
      .addCase(fetchPups.rejected, (state) => {
        state.fetchLoading = false;
      });
  },
});

export const pupsReducer = pupsSlice.reducer;

export const selectPups = (state: RootState) => state.pups.items;
export const selectPupsLoading = (state: RootState) => state.pups.fetchLoading;
