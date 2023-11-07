import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ITaxonomy } from "../../model/anecdote";
import { IMedia } from "../../model/media";

interface TaxonomyState {
    person: ITaxonomy | null
    band: ITaxonomy | null
    avatar: IMedia | null
}

const initialState: TaxonomyState = {
    person: null,
    band: null,
    avatar: null
}

const taxonomySlice = createSlice({
    name: "taxonomy",
    initialState,
    reducers: {
        setPerson: (state, { payload }: PayloadAction<ITaxonomy>) => {
            state.person = payload
        },
        setBand: (state, { payload }: PayloadAction<ITaxonomy>) => {
            state.band = payload
        },
        setAvatar: (state, { payload }: PayloadAction<IMedia>) => {
            state.avatar = payload
        },
        resetPerson: (state) => {
            state.person = null
            state.avatar = null
        },
        resetBand: (state) => {
            state.band = null
            state.avatar = null
        },
    }
})

export const { setBand, setPerson, setAvatar, resetBand, resetPerson } = taxonomySlice.actions

export default taxonomySlice.reducer