import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface FocusState {
    elementType: string,
    ID: string,
}

const initialState: FocusState = {
    elementType: "",
    ID: "",
}


const focusSlice = createSlice({
    name: "focus",
    initialState,
    reducers: {
        setFocusElement(state, action: PayloadAction<FocusState>) {
            state.elementType = action.payload.elementType;
            state.ID = action.payload.ID;
        },

        removeFocusElement(state) {
            state.elementType = "";
            state.ID = "";
        },
    }
    
});


export const { setFocusElement, removeFocusElement } = focusSlice.actions;
export default focusSlice.reducer;