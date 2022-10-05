import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { UserData } from '../../@types/user';

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:4444',
  prepareHeaders: (headers) => {
    const token = window.localStorage.getItem('token');

    if (token) {
      headers.set('authorization', token)
    }

    return headers
  },
})

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery,
  endpoints: (builder) => ({
    authMe: builder.query<UserData, void>({
      query: () => 'auth/me'
    }),
    loginUser: builder.mutation({
      query: (body) => ({
        url: 'auth/login',
        method: 'POST',
        body,
      }),
    }),
    registerUser: builder.mutation({
      query: (body) => ({
        url: 'auth/register',
        method: 'POST',
        body,
      }),
    }),
    setAvatar: builder.mutation({
      query: (body) => ({
        url: 'auth/avatar',
        method: 'POST',
        body,
      }),
    })
  })
})

export const { useAuthMeQuery, useLoginUserMutation, useRegisterUserMutation, useSetAvatarMutation } = userApi;