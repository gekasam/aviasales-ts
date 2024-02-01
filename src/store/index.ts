import { configureStore, Middleware } from '@reduxjs/toolkit';

import sortSlice from './sortSlice';
import filterSlice from './filterSlice';
import fetchSlice from './fetchSlice';
import ticketsListSlice from './ticketsListSlice';

const myLogger: Middleware = (store) => (next) => (action) => {
  console.log('dispatching', action);
  const result = next(action);
  console.log('next state', store.getState());
  return result;
};

const store = configureStore({
  reducer: {
    sortReducer: sortSlice.reducer,
    filterReducer: filterSlice.reducer,
    fetchReducer: fetchSlice.reducer,
    ticketListReducer: ticketsListSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(myLogger),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
