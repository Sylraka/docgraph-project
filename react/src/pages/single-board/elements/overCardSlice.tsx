import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface OverCardState {
    cardID: number,
}

const initialState: OverCardState = {
    cardID: -1,
}

const overCardSlice = createSlice({
    name: "drag",
    initialState,
    reducers: {
        setOverCard(state, action: PayloadAction<number>) {
            state.cardID = action.payload;
        },
        removeOverCard(state) {
            state.cardID = -1;
        }
    }
});


export const { setOverCard, removeOverCard } = overCardSlice.actions;
export default overCardSlice.reducer;