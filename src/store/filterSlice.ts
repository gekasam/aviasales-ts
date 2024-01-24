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
      if (state.all) {
        state.without = true;
        state.one = true;
        state.two = true;
        state.three = true;
      } else {
        state.without = false;
        state.one = false;
        state.two = false;
        state.three = false;
      }
    },
    without: (state) => {
      state.without = !state.without;
      state.all = Boolean(+state.without * +state.one * +state.two * +state.three);
    },
    one: (state) => {
      state.one = !state.one;
      state.all = Boolean(+state.without * +state.one * +state.two * +state.three);
    },
    two: (state) => {
      state.two = !state.two;
      state.all = Boolean(+state.without * +state.one * +state.two * +state.three);
    },
    three: (state) => {
      state.three = !state.three;
      state.all = Boolean(+state.without * +state.one * +state.two * +state.three);
    },
  },
});

export const { all, without, one, two, three } = filterSlice.actions;

export default filterSlice;
