import classes from './Ticket.module.scss';

type Segment = {
  origin: string;
  destination: string;
  date: string;
  duration: number;
  stops: string[];
};

export type TicketData = {
  price: number;
  carrier: string;
  segments: Segment[];
};

interface TicketProps {
  ticketData: TicketData;
}

export default function Ticket({ ticketData }: TicketProps) {
  const segmentOneWay = ticketData.segments[0];
  const segmentReturn = ticketData.segments[1];

  const retriveTime = (departureDateString: string, duration: number) => {
    const departureDate = new Date(departureDateString);
    const departureHours = departureDate.getHours();
    const departureMinutes = departureDate.getMinutes();
    const departureTime = `${departureHours}:${departureMinutes}`;
    const durationHours = Math.floor(duration / 60);
    const durationMinutes = duration % 60;

    let arrivalHours =
      24 - departureHours - durationHours > 0
        ? departureHours + durationHours
        : Math.abs(24 - departureHours - durationHours);
    let arrivalMinutes;

    if (60 - departureMinutes - durationMinutes > 0) {
      arrivalMinutes = departureMinutes + durationMinutes;
    } else {
      arrivalHours += 1;
      arrivalMinutes = Math.abs(60 - departureMinutes - durationMinutes);
    }

    return {
      departureTime,
      arrivalTime: `${arrivalHours}:${arrivalMinutes}`,
      durationTime: `${durationHours}ч ${durationMinutes}м`,
    };
  };

  const timeSpan = (departureDateString: string, duration: number) =>
    `${retriveTime(departureDateString, duration).departureTime} - ${retriveTime(departureDateString, duration).arrivalTime}`;

  const transfersCount = (transfers: Array<string>) => {
    switch (transfers.length) {
      case 0:
        return 'Без пересадок';
      case 1:
        return '1 пересадка';
      case 2:
        return '2 пересадки';
      case 3:
        return '3 пересадки';
      default:
        return '';
    }
  };

  return (
    <article className={classes.ticket}>
      <header className={classes['ticket-header']}>
        <span className={classes.price}>{ticketData.price}</span>
        <img
          className={classes.logo}
          src={`https://pics.avs.io/99/36/${ticketData.carrier}.png`}
          alt="avia-company-logo"
        />
      </header>
      <section className={`${classes['route-details']}`}>
        <dl className={classes['route-details__item']}>
          <dt
            className={classes['route-details__item__header']}
          >{`${segmentOneWay.origin} – ${segmentOneWay.destination}`}</dt>
          <dd>{timeSpan(segmentOneWay.date, segmentOneWay.duration)}</dd>
        </dl>
        <dl className={classes['route-details__item']}>
          <dt className={classes['route-details__item__header']}>В пути</dt>
          <dd>{retriveTime(segmentOneWay.date, segmentOneWay.duration).durationTime}</dd>
        </dl>
        <dl className={classes['route-details__item']}>
          <dt className={classes['route-details__item__header']}>
            {transfersCount(segmentOneWay.stops)}
          </dt>
          <dd>{segmentOneWay.stops.join(', ')}</dd>
        </dl>
      </section>
      <section className={`${classes['route-details']}`}>
        <dl className={classes['route-details__item']}>
          <dt
            className={classes['route-details__item__header']}
          >{`${segmentReturn.origin} – ${segmentReturn.destination}`}</dt>
          <dd>{timeSpan(segmentReturn.date, segmentReturn.duration)}</dd>
        </dl>
        <dl className={classes['route-details__item']}>
          <dt className={classes['route-details__item__header']}>В пути</dt>
          <dd>{retriveTime(segmentReturn.date, segmentReturn.duration).durationTime}</dd>
        </dl>
        <dl className={classes['route-details__item']}>
          <dt className={classes['route-details__item__header']}>
            {transfersCount(segmentReturn.stops)}
          </dt>
          <dd>{segmentReturn.stops.join(', ')}</dd>
        </dl>
      </section>
    </article>
  );
}
