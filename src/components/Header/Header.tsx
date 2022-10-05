import React from 'react';
import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <AppBar>
      <Container maxWidth="lg">
        <Toolbar sx={{ p: 0 }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/">Absolute Blog</Link>
          </Typography>
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
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
