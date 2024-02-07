/* eslint-disable no-continue */
import type { TicketData } from '../Ticket/Ticket';
import store from '../../store';

const ticketsLimit = 5;

export default function takeFiveTickets(more: boolean): {
  displayedTickets: TicketData[];
  currentIdx: number;
  stop: boolean;
} {
  const storeFetch = store.getState().fetchReducer;
  const storeTicketsList = store.getState().ticketListReducer;
  const storeFilter = store.getState().filterReducer;
  const storeSort = store.getState().fetchReducer.sortState;

  // console.log('START TAKEFIVE');
  const displayedTickets: TicketData[] = [];
  const ticketsLength = storeFetch.tickets.length;
  let newCurrentIdx = storeTicketsList.currentIdx;

  if (
    (storeSort.sortValue !== storeSort.prevSortValue ||
      storeFilter.currentSum !== storeFilter.prevSum) &&
    !more
  ) {
    newCurrentIdx = 0;
  }

  if (!storeFilter.without && !storeFilter.one && !storeFilter.two && !storeFilter.three) {
    return {
      displayedTickets,
      currentIdx: newCurrentIdx,
      stop: storeFetch.stop,
    };
  }

  for (let i = 0; i < ticketsLimit && newCurrentIdx < ticketsLength; ) {
    // console.log('START CYCLE');
    const oneWayStopsNumber = storeFetch.tickets[newCurrentIdx].segments[0].stops.length;
    const returnStopsNumber = storeFetch.tickets[newCurrentIdx].segments[1].stops.length;
    const maxStops = Math.max(oneWayStopsNumber, returnStopsNumber);

    if (maxStops === 0) {
      // console.log(
      //   `oneWayStopsNumber: ${oneWayStopsNumber}|, returnStopsNumber: ${returnStopsNumber}|, maxStops: ${maxStops}, === 0|, filter without: ${storeFilter.without}|, ${JSON.stringify(storeFetch.tickets[i])}|`
      // );
      if (storeFilter.without) {
        // console.log(`imHere, without, ${storeFetch.tickets[i].price}`);
        displayedTickets.push(storeFetch.tickets[newCurrentIdx]);
        i += 1;
        newCurrentIdx += 1;
        continue;
      }
    }
    if (maxStops === 1) {
      // console.log(
      //   `oneWayStopsNumber: ${oneWayStopsNumber}|, returnStopsNumber: ${returnStopsNumber}|, maxStops: ${maxStops}|, === 1, filter one: ${storeFilter.one}|, ${JSON.stringify(storeFetch.tickets[i])}|`
      // );
      if (storeFilter.one) {
        // console.log(`imHere, one, ${storeFetch.tickets[i].price}`);
        displayedTickets.push(storeFetch.tickets[newCurrentIdx]);
        i += 1;
        newCurrentIdx += 1;
        continue;
      }
    }
    if (maxStops === 2) {
      // console.log(
      //   `oneWayStopsNumber: ${oneWayStopsNumber}|, returnStopsNumber: ${returnStopsNumber}|, maxStops: ${maxStops}|, === 2, filter two: ${storeFilter.two}|, ${JSON.stringify(storeFetch.tickets[i])}|`
      // );
      if (storeFilter.two) {
        // console.log(`imHere, two, ${storeFetch.tickets[i].price}`);
        displayedTickets.push(storeFetch.tickets[newCurrentIdx]);
        i += 1;
        newCurrentIdx += 1;
        continue;
      }
    }
    if (maxStops === 3) {
      // console.log(
      //   `oneWayStopsNumber: ${oneWayStopsNumber}|, returnStopsNumber: ${returnStopsNumber}|, maxStops: ${maxStops}, === 3|, filter three: ${storeFilter.three}|, ${JSON.stringify(storeFetch.tickets[i])}|`
      // );
      if (storeFilter.three) {
        // console.log(`imHere, three, ${storeFetch.tickets[i].price}`);
        displayedTickets.push(storeFetch.tickets[newCurrentIdx]);
        i += 1;
        newCurrentIdx += 1;
        continue;
      }
    }
    newCurrentIdx += 1;
    // console.log('END CYCLE');
  }

  // console.log('END TAKEFIVE');
  return {
    displayedTickets,
    currentIdx: newCurrentIdx,
    stop: storeFetch.stop,
  };
}
