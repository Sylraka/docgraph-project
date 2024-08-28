import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface DragState {
    elementType: string,
    ID: number,
    placeToTop: number,
    placeToRight: number,
    placeToBottom: number,
    placeToLeft: number
}

const initialState: DragState = {
    elementType: "",
    ID: -1,
    placeToTop: -1,
    placeToRight: -1,
    placeToBottom: -1,
    placeToLeft: -1
}

const dragSlice = createSlice({
    name: "drag",
    initialState,
    reducers: {
        setActiveDragElement(state, action: PayloadAction<DragState>) {
            state.elementType = action.payload.elementType;
            state.ID = action.payload.ID;
            if (action.payload.elementType === "card") {
                state.placeToTop = action.payload.placeToTop;
                state.placeToRight = action.payload.placeToRight;
                state.placeToBottom = action.payload.placeToBottom;
                state.placeToLeft = action.payload.placeToLeft;
            }
        },
        moveActiveDragElement(state, action: PayloadAction<DragState>) {
            if (action.payload.elementType === "card") {
                state.placeToTop = action.payload.placeToTop;
                state.placeToRight = action.payload.placeToRight;
                state.placeToBottom = action.payload.placeToBottom;
                state.placeToLeft = action.payload.placeToLeft;
            }
        },
        removeActiveDrag(state) {
            state.elementType = "";
            state.ID = -1;
            state.placeToTop = -1;
            state.placeToRight = -1;
            state.placeToBottom = -1;
            state.placeToLeft = -1
        }
    }
});


export const { setActiveDragElement, moveActiveDragElement, removeActiveDrag } = dragSlice.actions;
export default dragSlice.reducer;