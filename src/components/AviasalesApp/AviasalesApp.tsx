import { useEffect } from 'react';

import SortButtonsList from '../SortButtonsList';
import TicketList from '../TicketList';
import Filter from '../Filter';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchSearchId, fetchTickets } from '../../store/fetchSlice';
import { fiveMore } from '../../store/ticketsListSlice';

// eslint-disable-next-line import/no-unresolved
import logo from '/src/assets/images/Logo.svg';

import classes from './AviasalesApp.module.scss';

export default function AviasalesApp() {
  const storeFetch = useAppSelector((state) => state.fetchReducer);
  const storeTicketsList = useAppSelector((state) => state.ticketListReducer);
  const dispatch = useAppDispatch();

  function takeFive() {
    const nextFive = storeFetch.tickets.slice(
      storeTicketsList.ticketsIndexs.start,
      storeTicketsList.ticketsIndexs.end
    );
    dispatch(fiveMore(nextFive));
  }

  useEffect(() => {
    dispatch(fetchSearchId());
  }, [dispatch]);

  useEffect(() => {
    if (storeFetch.searchId && !storeFetch.loading && !storeFetch.stop) {
      dispatch(fetchTickets(storeFetch.searchId));
    }
  }, [storeFetch.searchId, storeFetch.loading, storeFetch.stop, dispatch]);

  useEffect(() => {
    if (storeFetch.stop) {
      takeFive();
    }
  }, [storeFetch.stop]);

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
            <button className={classes['button-more']} type="button" onClick={() => takeFive()}>
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
