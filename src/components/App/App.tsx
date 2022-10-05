import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material';

import HomePage from '../../pages/HomePage';
import LoginPage from '../../pages/LoginPage';
import RegisterPage from '../../pages/RegisterPage';
import Header from '../Header/Header';

function App() {
  return (
    <div className="App">
      <Header />
      <Container maxWidth="lg" sx={{ pt: '100px' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
