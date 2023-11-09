import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ITaxonomy } from "../../model/anecdote";
import { IMedia } from "../../model/media";

interface TaxonomyState {
    person: ITaxonomy | null
    band: ITaxonomy | null
    avatar: IMedia | null
    medium: ITaxonomy | null
    city: ITaxonomy | null
}

const initialState: TaxonomyState = {
    person: null,
    band: null,
    avatar: null,
    medium: null,
    city: null
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
        setMedium: (state, { payload }: PayloadAction<ITaxonomy>) => {
            state.medium = payload
        },
        setCity: (state, { payload }: PayloadAction<ITaxonomy>) => {
            state.city = payload
        },
        resetTaxonomy: (state) => {
            state.band = null
            state.person = null
            state.avatar = null
            state.medium = null
            state.city = null
        }
    }
})

export const { setBand, setPerson, setAvatar, setMedium, setCity, resetTaxonomy } = taxonomySlice.actions

export default taxonomySlice.reducer