import React, { useState } from 'react';
import { Button, Paper, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { useLoginUserMutation } from '../../redux/api/userApi';
import { login } from '../../redux/slices/auth';
import styles from './Login.module.css';

type FormValues = {
  email: string;
  password: string;
};

const Login = () => {
  const [loginUser] = useLoginUserMutation();
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector((state) => state.auth.isAuth);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    mode: 'onChange',
    defaultValues: {
      email: 'test@mail.ru',
      password: '12345',
    },
  });

  const onSubmit = handleSubmit((values) => {
    loginUser(values)
      .unwrap()
      .then((payload) => {
        window.localStorage.setItem('token', payload.token);
        dispatch(login());
      })
      .catch((error) => setErrorMessage(error.data.message));
  });

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography sx={{ textAlign: 'center', fontWeight: 'bold', mb: '30px' }} variant="h5">
        Вход в аккаунт
      </Typography>
      <form onSubmit={onSubmit}>
        <div className={styles.input}>
          <TextField
            className={styles.field}
            label="E-Mail"
            type="email"
            error={Boolean(errors.email?.message)}
            helperText={errors.email?.message}
            {...register('email', { required: 'Укажите почту' })}
            fullWidth
          />
        </div>
        <div className={styles.input}>
          <TextField
            className={styles.field}
            label="Пароль"
            type="password"
            error={Boolean(errors.password?.message)}
            helperText={errors.password?.message}
            {...register('password', {
              required: 'Укажите пароль',
              minLength: {
                value: 5,
                message: 'Минимум 5 символов',
              },
            })}
            fullWidth
          />
        </div>

        <Button type="submit" size="large" variant="contained" fullWidth disabled={!isValid}>
          Войти
        </Button>
      </form>
      {errorMessage && <div className={styles.error}>{errorMessage}</div>}
    </Paper>
  );
};

export default Login;
