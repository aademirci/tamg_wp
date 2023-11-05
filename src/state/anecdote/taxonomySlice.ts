import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ITaxonomy } from "../../model/anecdote";

interface TaxonomyState {
    person: ITaxonomy | null
    band: ITaxonomy | null
}

const initialState: TaxonomyState = {
    person: null,
    band: null
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
        }
    }
})

export const { setBand, setPerson } = taxonomySlice.actions

export default taxonomySlice.reducer