/* eslint-disable no-continue */
import { useEffect } from 'react';

import SortButtonsList from '../SortButtonsList';
import TicketList from '../TicketList';
import Filter from '../Filter';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchSearchId, fetchTickets, sort } from '../../store/fetchSlice';
import { fiveMore, takeFive } from '../../store/ticketsListSlice';
import type { TicketData } from '../Ticket/Ticket';

// eslint-disable-next-line import/no-unresolved
import logo from '/src/assets/images/Logo.svg';

import classes from './AviasalesApp.module.scss';

export default function AviasalesApp() {
  const storeSort = useAppSelector((state) => state.sortReducer);
  const storeFilter = useAppSelector((state) => state.filterReducer);
  const storeFetch = useAppSelector((state) => state.fetchReducer);
  const storeTicketsList = useAppSelector((state) => state.ticketListReducer);
  const dispatch = useAppDispatch();
  const ticketsLimit = 5;

  function takeFiveTickets(): { fiveTickets: TicketData[]; currentIdx: number; stop: boolean } {
    const fiveTickets = [];
    let newCurrentIdx = storeTicketsList.currentIdx;

    for (let i = storeTicketsList.currentIdx; i < ticketsLimit; ) {
      const oneWayStopsNumber = storeFetch.tickets[i].segments[0].stops.length;
      const returnStopsNumber = storeFetch.tickets[i].segments[1].stops.length;
      newCurrentIdx += 1;

      if (storeFilter.without && (oneWayStopsNumber === 0 || returnStopsNumber === 0)) {
        fiveTickets.push(storeFetch.tickets[i]);
        i += 1;
        continue;
      }
      if (storeFilter.one && (oneWayStopsNumber === 1 || returnStopsNumber === 1)) {
        fiveTickets.push(storeFetch.tickets[i]);
        i += 1;
        continue;
      }
      if (storeFilter.two && (oneWayStopsNumber === 2 || returnStopsNumber === 2)) {
        fiveTickets.push(storeFetch.tickets[i]);
        i += 1;
        continue;
      }
      if (storeFilter.three && (oneWayStopsNumber === 3 || returnStopsNumber === 3)) {
        fiveTickets.push(storeFetch.tickets[i]);
        i += 1;
        continue;
      }
      if (!storeFilter.without && !storeFilter.one && !storeFilter.two && !storeFilter.three) {
        fiveTickets.push(storeFetch.tickets[i]);
        i += 1;
        continue;
      }
    }

    return {
      fiveTickets,
      currentIdx: newCurrentIdx,
      stop: storeFetch.stop,
    };
  }

  function takeFirstFive() {
    dispatch(takeFive(takeFiveTickets()));
  }

  function takeFiveMore() {
    dispatch(fiveMore(takeFiveTickets()));
  }

  useEffect(() => {
    dispatch(fetchSearchId());
  }, [dispatch]);

  useEffect(() => {
    if (storeFetch.searchId && !storeFetch.loading && !storeFetch.stop) {
      dispatch(fetchTickets({ id: storeFetch.searchId, sortValue: storeSort.sortValue }));
    }
  }, [storeFetch.searchId, storeFetch.loading, storeFetch.stop, storeSort.sortValue, dispatch]);

  useEffect(() => {
    setTimeout(() => {
      dispatch(sort(storeSort.sortValue));
    });
  }, [storeSort.sortValue, dispatch]);

  useEffect(() => {
    if (storeFetch.tickets.length > 0 && !storeFetch.loading) {
      console.timeEnd('sortTimer');
      takeFirstFive();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storeFetch.tickets, storeFetch.loading]);

  return (
    <div className={classes['app-wrapper']}>
      <div className={classes.app}>
        <header className={classes['app-header']}>
          <a href="aviasales">
            <img className={classes.logo} src={logo} alt="logo and link go to aviasales" />
          </a>
        </header>
        <main className={classes.content}>
          <section className={classes['tickets-section']}>
            <SortButtonsList />
            <TicketList />
            <button className={classes['button-more']} type="button" onClick={() => takeFiveMore()}>
              ПОКАЗАТЬ ЕЩЕ 5 БИЛЕТОВ
            </button>
          </section>
          <aside className={classes.filter}>
            <Filter />
          </aside>
        </main>
      </div>
    </div>
  );
}
