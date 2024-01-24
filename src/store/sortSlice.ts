import { createSlice } from '@reduxjs/toolkit';

export type SortSlice = {
  sortValue: string;
};

const initialState: SortSlice = {
  sortValue: 'cheap',
};

const sortSlice = createSlice({
  name: 'sort',
  initialState,
  reducers: {
    cheap: (state) => {
      state.sortValue = 'cheap';
    },
    fast: (state) => {
      state.sortValue = 'fast';
    },
    optimal: (state) => {
      state.sortValue = 'optimal';
    },
  },
});

export const { cheap, fast, optimal } = sortSlice.actions;

export default sortSlice;
