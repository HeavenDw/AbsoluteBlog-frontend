import React from 'react';
import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { Link } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { logout } from '../../redux/slices/auth';
import UserInfo from '../UserInfo/UserInfo';

const Header = () => {
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const dispatch = useAppDispatch();

  const logoutHandler = () => {
    dispatch(logout());
    window.localStorage.removeItem('token');
  };

  return (
    <AppBar>
      <Container maxWidth="lg">
        <Toolbar sx={{ p: 0, gap: '10px' }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/">Absolute Blog</Link>
          </Typography>

          {isAuth ? (
            <>
              <UserInfo />

              <Link to="/create-post">
                <Button variant="outlined" color="inherit">
                  Создать статью
                </Button>
              </Link>

              <Button onClick={logoutHandler} variant="outlined" color="inherit">
                Выйти
              </Button>
            </>
          ) : (
            <>
              <Link to="/register">
                <Button variant="outlined" color="inherit">
                  Register
                </Button>
              </Link>

              <Link to="/login">
                <Button variant="outlined" color="inherit" sx={{ ml: 2 }}>
                  Login
                </Button>
              </Link>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
