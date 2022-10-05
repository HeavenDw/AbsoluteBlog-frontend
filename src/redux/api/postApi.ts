import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { UserData } from '../../@types/user';

interface Post {
  title: string;
  text: string;
  _id: string;
  viewsCount: number;
  createdAt: string;
  tags: string[];
  user: UserData;
}

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

export const postApi = createApi({
  reducerPath: 'postApi',
  tagTypes: ['Posts'],
  baseQuery,
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], void>({
      query: () => 'posts',
      providesTags: (result) =>
        result
          ? [
            ...result.map(({ _id }) => ({ type: 'Posts' as const, _id })),
            { type: 'Posts', id: 'LIST' },
          ]
          : [{ type: 'Posts', id: 'LIST' }],
    }),
    createPost: builder.mutation({
      query: (body) => ({
        url: 'posts',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Posts', id: 'LIST' }]
    }),
    getFullPost: builder.query<Post, string>({
      query: (id) => `posts/${id}`,
    }),
  })
})

export const { useGetPostsQuery, useGetFullPostQuery, useCreatePostMutation } = postApi;