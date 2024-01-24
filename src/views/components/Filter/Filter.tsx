import classes from './Filter.module.scss';

export default function Filter() {
  return (
    <div className={classes.filter}>
      <h2 className={classes['filter-header']}>КОЛИЧЕСТВО ПЕРЕСАДОК</h2>
      <ul>
        <li className={classes['filter-list__item']}>
          <label className={classes['filter-label']}>
            <input type="checkbox" className={classes['filter-checkbox']} />
            <span className={classes['custom-checkbox']} />
            Все
          </label>
        </li>
        <li className={classes['filter-list__item']}>
          <label className={classes['filter-label']}>
            <input type="checkbox" className={classes['filter-checkbox']} />
            <span className={classes['custom-checkbox']} />
            Без пересадок
          </label>
        </li>
        <li className={classes['filter-list__item']}>
          <label className={classes['filter-label']}>
            <input type="checkbox" className={classes['filter-checkbox']} />
            <span className={classes['custom-checkbox']} />1 пересадка
          </label>
        </li>
        <li className={classes['filter-list__item']}>
          <label className={classes['filter-label']}>
            <input type="checkbox" className={classes['filter-checkbox']} />
            <span className={classes['custom-checkbox']} />2 пересадки
          </label>
        </li>
        <li className={classes['filter-list__item']}>
          <label className={classes['filter-label']}>
            <input type="checkbox" className={classes['filter-checkbox']} />
            <span className={classes['custom-checkbox']} />3 пересадки
          </label>
        </li>
      </ul>
    </div>
  );
}
