import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface OverCardState {
    cardID: String,
}

const initialState: OverCardState = {
    cardID: "",
}

const overCardSlice = createSlice({
    name: "overCard",
    initialState,
    reducers: {
        setOverCard(state, action: PayloadAction<String>) {
            state.cardID = action.payload;
        },
        removeOverCard(state) {
            state.cardID = "";
        }
    }
});


export const { setOverCard, removeOverCard } = overCardSlice.actions;
export default overCardSlice.reducer;