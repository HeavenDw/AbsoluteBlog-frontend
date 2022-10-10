import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Post } from '../../@types/post';

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
    getPosts: builder.query<Post[], { tag: string; sortBy: string; }>({
      query: ({ tag, sortBy }) => ({
        url: `posts`,
        method: 'GET',
        params: { tag, sortBy },
      }),
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
      query: (id) => ({
        url: `posts/${id}`,
        method: 'GET'
      }),
    }),
    deletePost: builder.mutation<void, string>({
      query: (id) => ({
        url: `posts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Posts', id: 'LIST' }]
    }),
    updatePost: builder.mutation({
      query: (body) => ({
        url: `posts/${body.id}`,
        method: 'PATCH',
        body
      }),
      invalidatesTags: [{ type: 'Posts', id: 'LIST' }]
    }),
    getLastTags: builder.query<string[], void>({
      query: () => 'tags'
    })
  })
})

export const { useGetPostsQuery, useGetFullPostQuery, useCreatePostMutation, useDeletePostMutation, useUpdatePostMutation, useGetLastTagsQuery } = postApi;