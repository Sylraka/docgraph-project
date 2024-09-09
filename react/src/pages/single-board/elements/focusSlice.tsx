import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface FocusState {
    elementType: string,
    ID: number,
}

const initialState: FocusState = {
    elementType: "",
    ID: -1,
}


const focusSlice = createSlice({
    name: "drag",
    initialState,
    reducers: {
        setFocusElement(state, action: PayloadAction<FocusState>) {
            state.elementType = action.payload.elementType;
            state.ID = action.payload.ID;
        },

        removeFocusElement(state) {
            state.elementType = "";
            state.ID = -1;
        },
    }
    
});


export const { setFocusElement, removeFocusElement } = focusSlice.actions;
export default focusSlice.reducer;