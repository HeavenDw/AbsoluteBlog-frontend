import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material';

import HomePage from '../../pages/HomePage';
import LoginPage from '../../pages/LoginPage';
import RegisterPage from '../../pages/RegisterPage';
import Header from '../Header/Header';
import { useAppDispatch } from '../../redux/hooks';
import { login } from '../../redux/slices/auth';
import { useAuthMeQuery } from '../../redux/api/userApi';
import FullPostPage from '../../pages/FullPostPage';
import CreatePostPage from '../../pages/CreatePostPage';

function App() {
  const dispatch = useAppDispatch();

  const { data: userData } = useAuthMeQuery();
  React.useEffect(() => {
    if (userData) {
      dispatch(login());
    }
  }, [userData]);

  return (
    <div className="App">
      <Header />
      <Container maxWidth="lg" sx={{ pt: '100px' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/posts/:id" element={<FullPostPage />} />
          <Route path="/posts/:id/edit" element={<CreatePostPage />} />
          <Route path="/create-post" element={<CreatePostPage />} />
          <Route path="/tag/:tag" element={<HomePage />} />
          <Route path="/sortBy/:sortBy" element={<HomePage />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
