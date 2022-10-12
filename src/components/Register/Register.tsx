import React, { useState } from 'react';
import { Button, Paper, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { useRegisterUserMutation } from '../../redux/api/userApi';
import { login } from '../../redux/slices/auth';
import styles from './Register.module.scss';

type FormValues = {
  nickname: string;
  email: string;
  password: string;
  avatarUrl: string;
};

const Register = () => {
  const [registerUser] = useRegisterUserMutation();
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector((state) => state.auth.isAuth);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>({ mode: 'onChange' });

  const onSubmit = handleSubmit((values) => {
    registerUser(values)
      .unwrap()
      .then((payload) => {
        window.localStorage.setItem('token', payload.token);
        dispatch(login());
        alert('Вы успешно зарегестрированы');
      })
      .catch((error) => setErrorMessage(error.data.message));
  });

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography sx={{ textAlign: 'center', fontWeight: 'bold', mb: '30px' }} variant="h5">
        Регистрация
      </Typography>
      <form onSubmit={onSubmit}>
        <div className={styles.input}>
          <TextField
            className={styles.field}
            label="Имя пользователя"
            type="text"
            error={Boolean(errors.nickname?.message)}
            helperText={errors.nickname?.message}
            {...register('nickname', {
              required: 'Укажите никнейм',
              minLength: {
                value: 5,
                message: 'Минимум 5 символов',
              },
            })}
            fullWidth
            color="info"
          />
        </div>
        <div className={styles.input}>
          <TextField
            className={styles.field}
            label="E-Mail"
            type="email"
            error={Boolean(errors.email?.message)}
            helperText={errors.email?.message}
            {...register('email', { required: 'Укажите почту' })}
            fullWidth
            color="info"
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
            color="info"
          />
        </div>

        <Button type="submit" size="large" variant="contained" fullWidth disabled={!isValid}>
          Зарегистрироваться
        </Button>
      </form>
      {errorMessage && <div className={styles.error}>{errorMessage}</div>}
    </Paper>
  );
};

export default Register;
