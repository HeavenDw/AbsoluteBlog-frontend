
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Comment } from '../../@types/comments';

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

export const commentsApi = createApi({
  reducerPath: 'commentsApi',
  tagTypes: ['Comments'],
  baseQuery,
  endpoints: (builder) => ({
    getComments: builder.query<Comment[], string>({
      query: (postId) => ({
        url: 'comments',
        params: { postId }
      }),
      providesTags: (result) =>
        result
          ? [
            ...result.map(({ _id }) => ({ type: 'Comments' as const, _id })),
            { type: 'Comments', id: 'CommentsList' },
          ]
          : [{ type: 'Comments', id: 'CommentsList' }],
    }),
    createComment: builder.mutation({
      query: (body) => ({
        url: 'comments',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Comments', id: 'CommentsList' }]
    }),
    deleteComment: builder.mutation<void, { _id: string, postId: string }>({
      query: (body) => ({
        url: `comments`,
        method: 'DELETE',
        body
      }),
      invalidatesTags: [{ type: 'Comments', id: 'CommentsList' }]
    }),
    updatePost: builder.mutation({
      query: (body) => ({
        url: `comments`,
        method: 'PATCH',
        body
      }),
      invalidatesTags: [{ type: 'Comments', id: 'CommentsList' }]
    }),
  })
})

export const { useGetCommentsQuery, useCreateCommentMutation, useDeleteCommentMutation, useUpdatePostMutation } = commentsApi;