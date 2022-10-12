import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.scss';

interface NavigationProps {}

const Navigation: FC<NavigationProps> = () => (
  <div className={styles.root}>
    <NavLink end to="/" className={(navData) => (navData.isActive ? styles.active : '')}>
      Статьи
    </NavLink>
    <NavLink to="/last" className={(navData) => (navData.isActive ? styles.active : '')}>
      Тэги и комментарии
    </NavLink>
  </div>
);

export default Navigation;
