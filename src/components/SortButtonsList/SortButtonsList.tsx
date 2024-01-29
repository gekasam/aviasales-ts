import classNames from 'classnames';

import { useAppSelector, useAppDispatch } from '../../hooks';
import { cheap, fast, optimal } from '../../store/sortSlice';

import classes from './SortButtonsList.module.scss';

export default function SortButtonsList() {
  const sort = useAppSelector((state) => state.sortReducer.sortValue);
  const dispatch = useAppDispatch();

  const buttonSortClasses = (value: string) =>
    classNames(classes['button-sort'], {
      [classes['button-sort--active']]: sort === value,
    });

  return (
    <ul className={classes['sort-list']}>
      <li className={classes['sort-list__item']}>
        <button
          type="button"
          value="cheap"
          className={buttonSortClasses('cheap')}
          onClick={() => dispatch(cheap())}
        >
          САМЫЙ ДЕШЁВЫЙ
        </button>
      </li>
      <li className={classes['sort-list__item']}>
        <button
          type="button"
          className={buttonSortClasses('fast')}
          onClick={() => dispatch(fast())}
        >
          САМЫЙ БЫСТРЫЙ
        </button>
      </li>
      <li className={classes['sort-list__item']}>
        <button
          type="button"
          className={buttonSortClasses('optimal')}
          onClick={() => dispatch(optimal())}
        >
          ОПТИМАЛНЫЙ
        </button>
      </li>
    </ul>
  );
}
