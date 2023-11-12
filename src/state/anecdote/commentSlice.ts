import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { IComment } from "../../model/comment"

interface CommentState {
    comments: IComment[]
    modalComments: IComment[]
    loading: boolean
    updated: boolean
}

const initialState: CommentState = {
    comments: [],
    modalComments: [],
    loading: true,
    updated: false
}

const commentSlice = createSlice({
    name: "comment",
    initialState,
    reducers: {
        startLoading: (state) => {
            state.loading = true
        },
        loadComments: (state, { payload }: PayloadAction<IComment[]>) => {
            state.comments = payload
            state.loading = false
            state.updated = false
        },
        loadModalComments: (state, { payload }: PayloadAction<IComment[]>) => {
            state.modalComments = payload
            state.loading = false
            state.updated = false
        },
        resetComments: (state) => {
            state.comments = []
            state.modalComments = []
        },
        updateComments: (state) => {
            state.updated = true
        }
    }
})

export const { startLoading, loadComments, loadModalComments, resetComments, updateComments } = commentSlice.actions

export default commentSlice.reducer