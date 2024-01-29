import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import type { TicketData } from '../components/Ticket/Ticket';

export type TicketsList = {
  renderedTickets: TicketData[];
  ticketsIndexs: {
    start: number;
    end: number;
  };
};

const initialState: TicketsList = {
  renderedTickets: [],
  ticketsIndexs: {
    start: 0,
    end: 5,
  },
};

const ticketsListSlice = createSlice({
  name: 'tickets-list',
  initialState,
  reducers: {
    fiveMore: (state, action: PayloadAction<TicketData[]>) => {
      state.renderedTickets.push(...action.payload);
      state.ticketsIndexs = {
        start: state.ticketsIndexs.start + 5,
        end: state.ticketsIndexs.end + 5,
      };
    },
  },
});

export const { fiveMore } = ticketsListSlice.actions;

export default ticketsListSlice;
