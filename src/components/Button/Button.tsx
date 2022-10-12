import React, { FC } from 'react';

import styles from './Button.module.scss';

interface ButtonProps {
  children?: React.ReactNode;
  onClick?: () => void;
  variant?: 'secondary' | 'red';
}

const Button: FC<ButtonProps> = ({ children, onClick, variant, ...otherProps }) => {
  return (
    <button onClick={onClick} className={`${styles.root} ${styles[variant || '']}`} {...otherProps}>
      {children}
    </button>
  );
};

export default Button;
