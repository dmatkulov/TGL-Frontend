import { Region } from '../../types/types.Regions';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { fetchRegions } from './regionsThunks';

interface RegionsState {
  regions: Region[];
  isLoading: boolean;
}

const initialState: RegionsState = {
  regions: [],
  isLoading: false,
};

const regionsSlice = createSlice({
  name: 'regions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchRegions.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchRegions.fulfilled, (state, { payload }) => {
      if (payload) {
        state.regions = payload;
      } else {
        throw new Error('Something wrong with data fetch: REGIONS');
      }
      state.isLoading = false;
    });
    builder.addCase(fetchRegions.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const regionsReducer = regionsSlice.reducer;
export const regionsState = (state: RootState) => state.regions.regions;
export const isRegionsLoading = (state: RootState) => state.regions.isLoading;
