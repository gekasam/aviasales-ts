import classNames from 'classnames';
import { useState } from 'react';

import classes from './SortButtonsList.module.scss';

export default function SortButtonsList() {
  const [sortActive, setSortActive] = useState('cheap');

  const buttonSortClasses = (value: string) =>
    classNames(classes['button-sort'], {
      [classes['button-sort--active']]: sortActive === value,
    });

  const handleChangeSort = (value: string) => {
    setSortActive(value);
  };

  return (
    <ul className={classes['sort-list']}>
      <li className={classes['sort-list__item']}>
        <button
          type="button"
          value="cheap"
          className={buttonSortClasses('cheap')}
          onClick={() => handleChangeSort('cheap')}
        >
          САМЫЙ ДЕШЁВЫЙ
        </button>
      </li>
      <li className={classes['sort-list__item']}>
        <button
          type="button"
          className={buttonSortClasses('fast')}
          onClick={() => handleChangeSort('fast')}
        >
          САМЫЙ БЫСТРЫЙ
        </button>
      </li>
      <li className={classes['sort-list__item']}>
        <button
          type="button"
          className={buttonSortClasses('optimal')}
          onClick={() => handleChangeSort('optimal')}
        >
          ОПТИМАЛНЫЙ
        </button>
      </li>
    </ul>
  );
}
