import uniqid from 'uniqid';

import Ticket from '../Ticket';
import { useAppSelector } from '../../hooks';

import classes from './TicketList.module.scss';

export default function TicketList() {
  const storeTicketsList = useAppSelector((state) => state.ticketListReducer);
  const ticketsItem = storeTicketsList.renderedTickets.map((ticket) => (
    <li className={classes['ticket-list__item']} key={uniqid.time('ticket-')}>
      <Ticket ticketData={ticket} />
    </li>
  ));

  return <ul className={classes['ticket-list']}>{ticketsItem}</ul>;
}
