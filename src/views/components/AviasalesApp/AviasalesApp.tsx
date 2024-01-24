import SortButtonsList from '../SortButtonsList';
import TicketList from '../TicketList';
import Filter from '../Filter';

// eslint-disable-next-line import/no-unresolved
import logo from '/src/assets/images/Logo.svg';

import classes from './AviasalesApp.module.scss';

export default function AviasalesApp() {
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
            <button className={classes['button-more']} type="button">
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
