import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface OverCardState {
    nav: string,
}

const initialState: OverCardState = {
    nav: "home",
}

const navigationSlice = createSlice({
    name: "navigation",
    initialState,
    reducers: {
        setNavigationToHome(state) {// action: PayloadAction<string>//action.payload;
            state.nav = "home"
        },
        setNavigationToSingleBoard(state) {// action: PayloadAction<string>//action.payload;
            state.nav = "single-board"
        },
        setNavigationToMultiBoard(state) {// action: PayloadAction<string>//action.payload;
            state.nav = "multi-board"
        },
    }
});


export const { setNavigationToHome, setNavigationToSingleBoard, setNavigationToMultiBoard } = navigationSlice.actions;
export default navigationSlice.reducer;