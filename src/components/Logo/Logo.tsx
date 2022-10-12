import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Logo.module.scss';

const Logo = () => {
  return (
    <Link to="/" className={styles.root}>
      <img src="/logo.png" />
    </Link>
  );
};

export default Logo;
