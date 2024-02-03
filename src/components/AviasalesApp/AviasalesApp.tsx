/* eslint-disable no-continue */
import classNames from 'classnames';
import { useEffect } from 'react';
import { Spin, ConfigProvider } from 'antd';

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
  const storeSort = useAppSelector((state) => state.fetchReducer.sortState);
  const storeFilter = useAppSelector((state) => state.filterReducer);
  const storeFetch = useAppSelector((state) => state.fetchReducer);
  const storeTicketsList = useAppSelector((state) => state.ticketListReducer);
  const dispatch = useAppDispatch();
  const ticketsLimit = 5;

  function takeFiveTickets(): { fiveTickets: TicketData[]; currentIdx: number; stop: boolean } {
    // console.log('START TAKEFIVE');
    const fiveTickets = [];
    let newCurrentIdx = storeTicketsList.currentIdx;

    if (
      storeSort.sortValue !== storeSort.prevSortValue ||
      storeFilter.currentSum !== storeFilter.prevSum
    ) {
      newCurrentIdx = 0;
    }

    for (let i = 0; i < ticketsLimit; ) {
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
          fiveTickets.push(storeFetch.tickets[newCurrentIdx]);
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
          fiveTickets.push(storeFetch.tickets[newCurrentIdx]);
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
          fiveTickets.push(storeFetch.tickets[newCurrentIdx]);
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
          fiveTickets.push(storeFetch.tickets[newCurrentIdx]);
          i += 1;
          newCurrentIdx += 1;
          continue;
        }
      }
      if (!storeFilter.without && !storeFilter.one && !storeFilter.two && !storeFilter.three) {
        // console.log(`maxStops ${maxStops}, nothingChange`);
        break;
      }
      newCurrentIdx += 1;
      // console.log('END CYCLE');
    }

    // console.log('END TAKEFIVE');
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
      takeFirstFive();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storeFetch.tickets, storeFetch.loading, storeFilter]);

  function getButtonContent() {
    if (storeFetch.loading) {
      return (
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#ffffff',
            },
          }}
        >
          <Spin />
        </ConfigProvider>
      );
    }
    if (!storeTicketsList.renderedTickets.length) {
      return '';
    }
    return 'ПОКАЗАТЬ ЕЩЕ 5 БИЛЕТОВ';
  }

  const buttonMoreClasses = classNames({
    [classes['button-more']]: true,
    [classes['button-more--disabled']]: !storeTicketsList.renderedTickets.length,
  });

  return (
    <div className={classes['app-wrapper']}>
      <div className={classes.app}>
        <header className={classes['app-header']}>
          <a href="aviasales">
            <img className={classes.logo} src={logo} alt="logo and link go to aviasales" />
          </a>
          {storeFetch.loading && <Spin className={classes['app-header__spinner']} />}
        </header>
        <main className={classes.content}>
          <section className={classes['tickets-section']}>
            <SortButtonsList />
            {!storeTicketsList.renderedTickets.length ? (
              <h2 className={classes['empty-list-notification']}>
                Рейсов, подходящих под заданные фильтры, не найдено
              </h2>
            ) : (
              <TicketList />
            )}
            <button
              className={buttonMoreClasses}
              type="button"
              onClick={() => !storeFetch.loading && takeFiveMore()}
            >
              {getButtonContent()}
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
