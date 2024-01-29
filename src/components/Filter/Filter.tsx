import { useAppSelector, useAppDispatch } from '../../hooks';
import { all, without, one, two, three } from '../../store/filterSlice';

import classes from './Filter.module.scss';

export default function Filter() {
  const filter = useAppSelector((state) => state.filterReducer);
  const dispatch = useAppDispatch();

  return (
    <div className={classes.filter}>
      <h2 className={classes['filter-header']}>КОЛИЧЕСТВО ПЕРЕСАДОК</h2>
      <ul>
        <li className={classes['filter-list__item']}>
          <label className={classes['filter-label']}>
            <input
              type="checkbox"
              className={classes['filter-checkbox']}
              checked={filter.all}
              onChange={() => dispatch(all())}
            />
            <span className={classes['custom-checkbox']} />
            Все
          </label>
        </li>
        <li className={classes['filter-list__item']}>
          <label className={classes['filter-label']}>
            <input
              type="checkbox"
              className={classes['filter-checkbox']}
              checked={filter.without}
              onChange={() => dispatch(without())}
            />
            <span className={classes['custom-checkbox']} />
            Без пересадок
          </label>
        </li>
        <li className={classes['filter-list__item']}>
          <label className={classes['filter-label']}>
            <input
              type="checkbox"
              className={classes['filter-checkbox']}
              checked={filter.one}
              onChange={() => dispatch(one())}
            />
            <span className={classes['custom-checkbox']} />1 пересадка
          </label>
        </li>
        <li className={classes['filter-list__item']}>
          <label className={classes['filter-label']}>
            <input
              type="checkbox"
              className={classes['filter-checkbox']}
              checked={filter.two}
              onChange={() => dispatch(two())}
            />
            <span className={classes['custom-checkbox']} />2 пересадки
          </label>
        </li>
        <li className={classes['filter-list__item']}>
          <label className={classes['filter-label']}>
            <input
              type="checkbox"
              className={classes['filter-checkbox']}
              checked={filter.three}
              onChange={() => dispatch(three())}
            />
            <span className={classes['custom-checkbox']} />3 пересадки
          </label>
        </li>
      </ul>
    </div>
  );
}
