import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { IAnecdote } from "../../model/anecdote"

interface AnecdoteState {
  loading: boolean
  anecdotes: IAnecdote[]
  anecdote: IAnecdote | null
  page: number
}

const initialState: AnecdoteState = {
  loading: true,
  anecdotes: [],
  anecdote: null,
  page: 1
}

const anecdoteSlice = createSlice({
  name: "anecdote",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.loading = true
    },
    loadAnecdotes: (state, { payload }: PayloadAction<IAnecdote[]>) => {
      state.anecdotes = [...state.anecdotes, ...payload]
      state.loading = false
    },
    resetAnecdotes: (state) => {
      state.anecdotes = []
      state.loading = true
    },
    loadAnecdote: (state, { payload }: PayloadAction<IAnecdote>) => {
      state.anecdote = payload
      state.loading = false
    },
    setPage: (state, { payload }: PayloadAction<number>) => {
      state.page = payload
    },
    stopLoading: (state) => {
      state.loading = false
    }
  },
})

export const { loadAnecdotes, loadAnecdote, startLoading, stopLoading, resetAnecdotes, setPage } = anecdoteSlice.actions

export default anecdoteSlice.reducer
