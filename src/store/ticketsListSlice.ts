import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import type { TicketData } from '../components/Ticket/Ticket';

export type TicketsList = {
  renderedTickets: TicketData[];
  currentIdx: number;
};

interface TakeFiveArgs {
  displayedTickets: TicketData[];
  currentIdx: number;
  stop: boolean;
}

const initialState: TicketsList = {
  renderedTickets: [],
  currentIdx: 0,
};

const ticketsListSlice = createSlice({
  name: 'tickets-list',
  initialState,
  reducers: {
    takeFive: (state, action: PayloadAction<TakeFiveArgs>) => {
      if (action.payload.stop) {
        state.renderedTickets = action.payload.displayedTickets;
        state.currentIdx = action.payload.currentIdx;
      } else {
        state.renderedTickets = action.payload.displayedTickets;
      }
    },
    fiveMore: (state, action: PayloadAction<TakeFiveArgs>) => {
      state.renderedTickets.push(...action.payload.displayedTickets);
      state.currentIdx = action.payload.currentIdx;
    },
  },
});

export const { takeFive, fiveMore } = ticketsListSlice.actions;

export default ticketsListSlice;
