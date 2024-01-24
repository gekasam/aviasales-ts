import Ticket from '../Ticket';

import classes from './TicketList.module.scss';

export default function TicketList() {
  return (
    <ul className={classes['ticket-list']}>
      <li className={classes['ticket-list__item']}>
        <Ticket />
      </li>
      <li className={classes['ticket-list__item']}>
        <Ticket />
      </li>
      <li className={classes['ticket-list__item']}>
        <Ticket />
      </li>
      <li className={classes['ticket-list__item']}>
        <Ticket />
      </li>
      <li className={classes['ticket-list__item']}>
        <Ticket />
      </li>
    </ul>
  );
}
