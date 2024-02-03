import { createSlice, createAsyncThunk, Action, PayloadAction } from '@reduxjs/toolkit';

import type { TicketData } from '../components/Ticket/Ticket';

type Tickets = TicketData[];

type SortData = {
  sortValue: string;
  prevSortValue: string;
};

type FetchData = {
  searchId: string;
  tickets: Tickets;
  stop: boolean;
  loading: boolean;
  error: string | null;
  sortState: SortData;
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

interface Params {
  id: string;
  sortValue: string;
}

export const fetchTickets = createAsyncThunk<
  { tickets: []; stop: boolean; sortValue: string },
  Params,
  { rejectValue: string }
>(
  'fetch/tickets',
  async ({ id, sortValue }, { rejectWithValue }) => {
    const response = await fetch(`https://aviasales-test-api.kata.academy/tickets?searchId=${id}`);
    if (response.status !== 200) {
      return rejectWithValue(`Server Error ${response.status}`);
    }
    const data = await response.json();
    data.sortValue = sortValue;
    return data;
  }
  /*   (_, { rejectWithValue }) =>
    fetch('https://aviasales-test-api.kata.academy/search')
      .then((response) => {
        if (response.status !== 200) {
          throw new Error(`Server Error ${response.status}`);
        }
        return response.json();
      })
      .then((data) => data.searchId)
      .catch((error) => rejectWithValue(`My custom error, error message: ${error.message}`)) */
);

const initialState: FetchData = {
  searchId: '',
  tickets: [],
  stop: false,
  loading: false,
  error: null,
  sortState: {
    sortValue: 'cheap',
    prevSortValue: 'cheap',
  },
};

function isError(action: Action) {
  return action.type.endsWith('rejected');
}

export function sortCheap<T extends TicketData>(rawArray: T[]): T[] {
  return rawArray.sort((a: T, b: T) => a.price - b.price);
}

export function sortFast<T extends TicketData>(rawArray: T[]): T[] {
  return rawArray.sort(
    (a: T, b: T) =>
      a.segments[0].duration +
      a.segments[1].duration -
      (b.segments[0].duration + b.segments[1].duration)
  );
}

export function sortOptimal<T extends TicketData>(rawArray: T[]): T[] {
  return rawArray.sort((a: T, b: T) => {
    if (a.price !== b.price) {
      return a.price - b.price;
    }
    return (
      a.segments[0].duration +
      a.segments[1].duration -
      (b.segments[0].duration + b.segments[1].duration)
    );
  });
}

/* export function sortCheap<T extends TicketData>(rawArray: T[]): T[] {
    function merge(array1: T[], array2: T[]): T[] {
      const merged: T[] = [];
      let i: number = 0;
      let j: number = 0;

      const arr1Length = array1.length;
      const arr2Length = array2.length;

      while (i < arr1Length && j < arr2Length) {
        if (array1[i].price < array2[j].price) {
          merged.push(array1[i]);
          i += 1;
        } else {
          merged.push(array2[j]);
          j += 1;
        }
      }
      while (i < arr1Length) {
        merged.push(array1[i]);
        i += 1;
      }
      while (j < arr2Length) {
        merged.push(array2[j]);
        j += 1;
      }
      return merged;
    }

    function mergeSort(array: T[]): T[] {
      if (array.length <= 1) return array;

      const mid = Math.floor(array.length / 2);
      const left: T[] = mergeSort(array.slice(0, mid));
      const right: T[] = mergeSort(array.slice(mid));

      return merge(left, right);
    }

    return mergeSort(rawArray);
  }

  export function sortFast<T extends TicketData>(rawArray: T[]): T[] {
    function merge(array1: T[], array2: T[]): T[] {
      const merged: T[] = [];
      let i: number = 0;
      let j: number = 0;

      const arr1Length = array1.length;
      const arr2Length = array2.length;

      while (i < arr1Length && j < arr2Length) {
        if (
          array1[i].segments[0].duration + array1[i].segments[1].duration <
          array2[j].segments[0].duration + array2[j].segments[1].duration
        ) {
          merged.push(array1[i]);
          i += 1;
        } else {
          merged.push(array2[j]);
          j += 1;
        }
      }
      while (i < arr1Length) {
        merged.push(array1[i]);
        i += 1;
      }
      while (j < arr2Length) {
        merged.push(array2[j]);
        j += 1;
      }
      return merged;
    }

    function mergeSort(array: T[]): T[] {
      if (array.length <= 1) return array;

      const mid = Math.floor(array.length / 2);
      const left: T[] = mergeSort(array.slice(0, mid));
      const right: T[] = mergeSort(array.slice(mid));

      return merge(left, right);
    }

    return mergeSort(rawArray);
  }

export function sortOptimal<T extends TicketData>(rawArray: T[]): T[] {
  function merge(array1: T[], array2: T[]): T[] {
    const merged: T[] = [];
    let i: number = 0;
    let j: number = 0;

    const arr1Length = array1.length;
    const arr2Length = array2.length;

    while (i < arr1Length && j < arr2Length) {
      if (array1[i].price < array2[j].price) {
        merged.push(array1[i]);
        i += 1;
      } else if (array1[i].price > array2[j].price) {
        merged.push(array2[j]);
        j += 1;
      } else if (
        array1[i].segments[0].duration + array1[i].segments[1].duration <
        array2[j].segments[0].duration + array2[j].segments[1].duration
      ) {
        merged.push(array1[i]);
        i += 1;
      } else {
        merged.push(array2[j]);
        j += 1;
      }
    }
    while (i < arr1Length) {
      merged.push(array1[i]);
      i += 1;
    }
    while (j < arr2Length) {
      merged.push(array2[j]);
      j += 1;
    }
    return merged;
  }

  function mergeSort(array: T[]): T[] {
    if (array.length <= 1) return array;

    const mid = Math.floor(array.length / 2);
    const left: T[] = mergeSort(array.slice(0, mid));
    const right: T[] = mergeSort(array.slice(mid));

    return merge(left, right);
  }

  return mergeSort(rawArray);
} */

const fetchSlice = createSlice({
  name: 'fetch',
  initialState,
  reducers: {
    cheap: (state, action) => {
      state.loading = true;
      state.sortState.prevSortValue = action.payload;
      state.sortState.sortValue = 'cheap';
    },
    fast: (state, action) => {
      state.loading = true;
      state.sortState.prevSortValue = action.payload;
      state.sortState.sortValue = 'fast';
    },
    optimal: (state, action) => {
      state.loading = true;
      state.sortState.prevSortValue = action.payload;
      state.sortState.sortValue = 'optimal';
    },
    sort: (state, action: PayloadAction<string>) => {
      if (action.payload === 'cheap') {
        state.tickets = sortCheap(state.tickets);
      } else if (action.payload === 'fast') {
        state.tickets = sortFast(state.tickets);
      } else {
        state.tickets = sortOptimal(state.tickets);
      }
      state.loading = false;
    },
  },
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
        if (action.payload.sortValue === 'cheap') {
          state.tickets = sortCheap(state.tickets);
        } else if (action.payload.sortValue === 'fast') {
          state.tickets = sortFast(state.tickets);
        } else {
          state.tickets = sortOptimal(state.tickets);
        }
        state.loading = false;
        state.error = null;
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { sort, cheap, fast, optimal } = fetchSlice.actions;

export default fetchSlice;
