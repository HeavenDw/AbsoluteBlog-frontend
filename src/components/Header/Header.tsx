import React, { useEffect, useState } from 'react';
import { AppBar } from '@mui/material';
import { Container } from '@mui/system';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { logout } from '../../redux/slices/auth';
import UserInfo from '../UserInfo/UserInfo';
import Button from '../Button/Button';
import Logo from '../Logo/Logo';
import styles from './Header.module.scss';

const Header = () => {
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const logoutHandler = () => {
    if (window.confirm('Вы действительно хотите выйти?')) {
      dispatch(logout());
      window.localStorage.removeItem('token');
      setIsOpen(false);
    }
  };

  return (
    <AppBar>
      <Container maxWidth="lg">
        <div className={styles.root}>
          <div className={styles.logo}>
            <Logo />
          </div>

          <Link to="/search" className={styles.search}>
            <SearchIcon />
          </Link>

          <div className={isOpen ? `${styles.menu} ${styles.active}` : `${styles.menu}`}>
            {isAuth && <UserInfo />}
            <div className={styles.buttons}>
              {isAuth ? (
                <>
                  <Link to="/create-post" onClick={() => setIsOpen(false)}>
                    <Button>Создать статью</Button>
                  </Link>

                  <Button onClick={logoutHandler} variant="red">
                    Выйти
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/register" onClick={() => setIsOpen(false)}>
                    <Button>Зарегистрироваться</Button>
                  </Link>

                  <Link to="/login" onClick={() => setIsOpen(false)}>
                    <Button>Войти</Button>
                  </Link>
                </>
              )}
            </div>
          </div>

          <button
            className={isOpen ? `${styles.burger} ${styles.active}` : `${styles.burger}`}
            onClick={() => {
              setIsOpen(!isOpen);
            }}>
            <span></span>
          </button>
        </div>
      </Container>
    </AppBar>
  );
};

export default Header;
