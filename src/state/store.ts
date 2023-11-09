import { configureStore } from "@reduxjs/toolkit"
import anecdoteReducer from "./anecdote/anecdoteSlice"
import taxonomyReducer from "./anecdote/taxonomySlice"
import commentReducer from "./anecdote/commentSlice"

export const store = configureStore({
  reducer: {
    anecdote: anecdoteReducer,
    taxonomy: taxonomyReducer,
    comment: commentReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
