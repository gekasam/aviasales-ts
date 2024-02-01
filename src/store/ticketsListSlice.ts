import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import type { TicketData } from '../components/Ticket/Ticket';

export type TicketsList = {
  renderedTickets: TicketData[];
  currentIdx: number;
};

interface TakeFiveArgs {
  fiveTickets: TicketData[];
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
        state.renderedTickets = action.payload.fiveTickets;
        state.currentIdx = action.payload.currentIdx;
      } else {
        state.renderedTickets = action.payload.fiveTickets;
      }
    },
    fiveMore: (state, action: PayloadAction<TakeFiveArgs>) => {
      state.renderedTickets.push(...action.payload.fiveTickets);
      state.currentIdx = action.payload.currentIdx;
    },
  },
});

export const { takeFive, fiveMore } = ticketsListSlice.actions;

export default ticketsListSlice;
