import { createSlice, createAsyncThunk, Action, PayloadAction } from '@reduxjs/toolkit';

type Tickets = [];
type ExternalData = {
  searchId: string;
  tickets: Tickets;
  stop: boolean;
  loading: boolean;
  error: string | null;
};

export const fetchSearchId = createAsyncThunk<string, undefined, { rejectValue: string }>(
  'fetch/id',
  (_, { rejectWithValue }) =>
    fetch('https://aviasales-test-api.kata.academy/search')
      .then((response) => {
        if (response.status !== 200) {
          throw new Error(`Server Error ${response.status}`);
        }
        return response.json();
      })
      .then((data) => data.searchId)
      .catch((error) => rejectWithValue(`My custom error, error message: ${error.message}`))

  // async (_, {rejectWithValue}) => {
  //   const response = await fetch('https://aviasales-test-api.ata.academy/searchs');
  //   console.log('yo');
  //   if (response.status !== 200) {
  //     return rejectWithValue('HuYo');
  //   }
  //   const data = await response.json();
  //   return data.searchId;
  // }
);

export const fetchTickets = createAsyncThunk<
  { tickets: []; stop: boolean },
  string,
  { rejectValue: string }
>(
  'fetch/tickets',
  async (id, { rejectWithValue }) => {
    const response = await fetch(`https://aviasales-test-api.kata.academy/tickets?searchId=${id}`);
    if (response.status !== 200) {
      return rejectWithValue(`Server Error ${response.status}`);
    }
    const data = await response.json();
    return data;
  }
  // (_, { rejectWithValue }) =>
  //   fetch('https://aviasales-test-api.kata.academy/search')
  //     .then((response) => {
  //       if (response.status !== 200) {
  //         throw new Error(`Server Error ${response.status}`);
  //       }
  //       return response.json();
  //     })
  //     .then((data) => data.searchId)
  //     .catch((error) => rejectWithValue(`My custom error, error message: ${error.message}`))
);

const initialState: ExternalData = {
  searchId: '',
  tickets: [],
  stop: false,
  loading: false,
  error: null,
};

function isError(action: Action) {
  return action.type.endsWith('rejected');
}

const fetchSlice = createSlice({
  name: 'fetch',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSearchId.fulfilled, (state, action) => {
        state.searchId = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchTickets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTickets.fulfilled, (state, action) => {
        state.tickets.push(...action.payload.tickets);
        state.stop = action.payload.stop;
        state.loading = false;
        state.error = null;
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default fetchSlice;
