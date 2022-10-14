import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://absolute-blog.herokuapp.com',
  prepareHeaders: (headers) => {
    const token = window.localStorage.getItem('token');

    if (token) {
      headers.set('authorization', token)
    }

    return headers
  },
})

export const uploadApi = createApi({
  reducerPath: 'uploadApi',
  baseQuery,
  endpoints: (builder) => ({
    uploadImage: builder.mutation({
      query: (body) => ({
        url: 'upload',
        method: 'POST',
        body,
      }),
    })
  })
})

export const { useUploadImageMutation } = uploadApi;