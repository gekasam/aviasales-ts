import classNames from 'classnames';
import { useEffect } from 'react';
import { Spin, ConfigProvider } from 'antd';

import SortButtonsList from '../SortButtonsList';
import TicketList from '../TicketList';
import Filter from '../Filter';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchSearchId, fetchTickets, /* sort, */ asyncSort } from '../../store/fetchSlice';
import { fiveMore, takeFive } from '../../store/ticketsListSlice';
import takeFiveTickets from '../filterFunction/filterFunction';

// eslint-disable-next-line import/no-unresolved
import logo from '/src/assets/images/Logo.svg';

import classes from './AviasalesApp.module.scss';

export default function AviasalesApp() {
  const storeSort = useAppSelector((state) => state.fetchReducer.sortValue);
  const storeFilter = useAppSelector((state) => state.filterReducer);
  const storeFetch = useAppSelector((state) => state.fetchReducer);
  const storeTicketsList = useAppSelector((state) => state.ticketListReducer);
  const dispatch = useAppDispatch();

  function takeFirstFive() {
    dispatch(takeFive(takeFiveTickets(false)));
  }

  function takeFiveMore() {
    dispatch(fiveMore(takeFiveTickets(true)));
  }

  useEffect(() => {
    dispatch(fetchSearchId());
  }, [dispatch]);

  useEffect(() => {
    if (storeFetch.searchId && !storeFetch.loading && !storeFetch.stop) {
      dispatch(fetchTickets(storeFetch.searchId));
    }
  }, [storeFetch.searchId, storeFetch.loading, storeFetch.stop, storeSort, dispatch]);

  useEffect(() => {
    dispatch(asyncSort({ sortValue: storeSort, tickets: storeFetch.tickets }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storeSort, dispatch]);

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
