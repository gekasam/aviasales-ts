import { createSlice } from '@reduxjs/toolkit';

export type FilterSlice = {
  all: boolean;
  without: boolean;
  one: boolean;
  two: boolean;
  three: boolean;
  currentSum: number;
  prevSum: number;
};

const initialState: FilterSlice = {
  all: false,
  without: true,
  one: true,
  two: true,
  three: false,
  currentSum: 3,
  prevSum: 3,
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    all: (state, action) => {
      state.all = !state.all;
      state.without = state.all;
      state.one = state.all;
      state.two = state.all;
      state.three = state.all;
      state.currentSum = +state.without + +state.one + +state.two + +state.three;
      state.prevSum = action.payload;
    },
    without: (state, action) => {
      state.without = !state.without;
      state.all = state.without && state.one && state.two && state.three;
      state.currentSum = +state.without + +state.one + +state.two + +state.three;
      state.prevSum = action.payload;
    },
    one: (state, action) => {
      state.one = !state.one;
      state.all = state.without && state.one && state.two && state.three;
      state.currentSum = +state.without + +state.one + +state.two + +state.three;
      state.prevSum = action.payload;
    },
    two: (state, action) => {
      state.two = !state.two;
      state.all = state.without && state.one && state.two && state.three;
      state.currentSum = +state.without + +state.one + +state.two + +state.three;
      state.prevSum = action.payload;
    },
    three: (state, action) => {
      state.three = !state.three;
      state.all = state.without && state.one && state.two && state.three;
      state.currentSum = +state.without + +state.one + +state.two + +state.three;
      state.prevSum = action.payload;
    },
  },
});

export const { all, without, one, two, three } = filterSlice.actions;

export default filterSlice;
