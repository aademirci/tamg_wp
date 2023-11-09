import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { IComment } from "../../model/comment"

interface CommentState {
    comments: IComment[]
    modalComments: IComment[]
    loading: boolean
}

const initialState: CommentState = {
    comments: [],
    modalComments: [],
    loading: true
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
        },
        loadModalComments: (state, { payload }: PayloadAction<IComment[]>) => {
            state.modalComments = payload
            state.loading = false
        },
        resetComments: (state) => {
            state.comments = []
            state.modalComments = []
        }
    }
})

export const { startLoading, loadComments, loadModalComments, resetComments } = commentSlice.actions

export default commentSlice.reducer