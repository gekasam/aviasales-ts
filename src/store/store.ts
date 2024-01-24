import { configureStore } from '@reduxjs/toolkit';

import sortSlice from './sortSlice';
import filterSlice from './filterSlice';

export const store = configureStore({
  reducer: {
    sortReducer: sortSlice.reducer,
    filterReducer: filterSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
