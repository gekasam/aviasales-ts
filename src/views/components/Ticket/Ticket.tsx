import companyLogo from '../../../assets/images/S7-Logo.svg';

import classes from './Ticket.module.scss';

export default function Ticket() {
  return (
    <article className={classes.ticket}>
      <header className={classes['ticket-header']}>
        <span className={classes.price}>13 400р</span>
        <img className={classes.logo} src={companyLogo} alt="avia-company-logo" />
      </header>
      <section className={`${classes['route-details']} ${classes['one-way']}`}>
        <dl className={classes['route-details__item']}>
          <dt className={classes['route-details__item__header']}>MOW – HKT</dt>
          <dd>10:45 – 08:00</dd>
        </dl>
        <dl className={classes['route-details__item']}>
          <dt className={classes['route-details__item__header']}>В пути</dt>
          <dd>21ч 15м</dd>
        </dl>
        <dl className={classes['route-details__item']}>
          <dt className={classes['route-details__item__header']}>2 пересадки</dt>
          <dd>HKG, JNB</dd>
        </dl>
      </section>
      <section className={`${classes['route-details']} ${classes.return}`}>
        <dl className={classes['route-details__item']}>
          <dt className={classes['route-details__item__header']}>MOW – HKT</dt>
          <dd>11:20 – 00:50</dd>
        </dl>
        <dl className={classes['route-details__item']}>
          <dt className={classes['route-details__item__header']}>В пути</dt>
          <dd>13ч 30м</dd>
        </dl>
        <dl className={classes['route-details__item']}>
          <dt className={classes['route-details__item__header']}>1 пересадка</dt>
          <dd>HKG</dd>
        </dl>
      </section>
    </article>
  );
}
