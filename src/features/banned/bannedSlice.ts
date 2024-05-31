import { Banned } from '../../types/types.Banned';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { fetchBanned } from './bannedThunks';

interface BannedState {
  banned: Banned[];
  isLoading: boolean;
}

const initialState: BannedState = {
  banned: [],
  isLoading: false,
};

const bannedSlice = createSlice({
  name: 'banned',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchBanned.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchBanned.fulfilled, (state, { payload }) => {
        if (payload) {
          state.banned = payload.banned;
        }
        state.isLoading = false;
      })
      .addCase(fetchBanned.rejected, (state) => {
        state.isLoading = false;
      }),
});

export const bannedReducer = bannedSlice.reducer;
export const bannedState = (state: RootState) => state.banned.banned;
export const isBannedLoading = (state: RootState) => state.banned.isLoading;
