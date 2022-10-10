import { configureStore } from "@reduxjs/toolkit";
import { commentsApi } from "./api/commentsApi";
import { postApi } from "./api/postApi";
import { uploadApi } from "./api/uploadApi";
import { userApi } from "./api/userApi";
import { authReducer } from "./slices/auth";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [userApi.reducerPath]: userApi.reducer,
    [postApi.reducerPath]: postApi.reducer,
    [uploadApi.reducerPath]: uploadApi.reducer,
    [commentsApi.reducerPath]: commentsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({}).concat(userApi.middleware, uploadApi.middleware, postApi.middleware, commentsApi.middleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch