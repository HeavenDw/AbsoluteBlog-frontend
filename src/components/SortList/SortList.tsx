import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import styles from './SortList.module.scss';

const SortList = () => {
  const { sortBy } = useParams();

  return (
    <ul className={styles.root}>
      <li className={!sortBy ? styles.active : ''}>
        <Link to="/">Новые</Link>
      </li>
      <li className={sortBy === 'popular' ? styles.active : ''}>
        <Link to="/sortBy/popular">Популярные</Link>
      </li>
    </ul>
  );
};

export default SortList;
