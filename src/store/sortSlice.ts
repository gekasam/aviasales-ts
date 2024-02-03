/* import { createSlice } from '@reduxjs/toolkit';

export type SortSlice = {
  sortValue: string;
  prevSortValue: string;
};

const initialState: SortSlice = {
  sortValue: 'cheap',
  prevSortValue: 'cheap',
};

const sortSlice = createSlice({
  name: 'sort',
  initialState,
  reducers: {
    cheap: (state, action) => {
      state.prevSortValue = action.payload;
      state.sortValue = 'cheap';
    },
    fast: (state, action) => {
      state.prevSortValue = action.payload;
      state.sortValue = 'fast';
    },
    optimal: (state, action) => {
      state.prevSortValue = action.payload;
      state.sortValue = 'optimal';
    },
  },
});

export const { cheap, fast, optimal } = sortSlice.actions;

export default sortSlice;
 */
