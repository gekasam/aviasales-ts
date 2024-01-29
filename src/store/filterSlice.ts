import { createSlice } from '@reduxjs/toolkit';

export type FilterSlice = {
  all: boolean;
  without: boolean;
  one: boolean;
  two: boolean;
  three: boolean;
};

const initialState: FilterSlice = {
  all: false,
  without: true,
  one: true,
  two: true,
  three: false,
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    all: (state) => {
      state.all = !state.all;
      state.without = state.all;
      state.one = state.all;
      state.two = state.all;
      state.three = state.all;
    },
    without: (state) => {
      state.without = !state.without;
      state.all = state.without && state.one && state.two && state.three;
    },
    one: (state) => {
      state.one = !state.one;
      state.all = state.without && state.one && state.two && state.three;
    },
    two: (state) => {
      state.two = !state.two;
      state.all = state.without && state.one && state.two && state.three;
    },
    three: (state) => {
      state.three = !state.three;
      state.all = state.without && state.one && state.two && state.three;
    },
  },
});

export const { all, without, one, two, three } = filterSlice.actions;

export default filterSlice;
