import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface DragState {
    elementType: string,
    ID: number,
    placeToTopY: number,
    placeToRight: number,
    placeToBottom: number,
    placeToLeftX: number
}

const initialState: DragState = {
    elementType: "",
    ID: -1,
    placeToTopY: -1,
    placeToRight: -1,
    placeToBottom: -1,
    placeToLeftX: -1
}

const dragSlice = createSlice({
    name: "drag",
    initialState,
    reducers: {
        setActiveDragElement(state, action: PayloadAction<DragState>) {
            state.elementType = action.payload.elementType;
            state.ID = action.payload.ID;
            if (action.payload.elementType === "card") {
              //  console.log("elementtype: ", action.payload )
                state.placeToTopY = action.payload.placeToTopY;
                state.placeToRight = action.payload.placeToRight;
                state.placeToBottom = action.payload.placeToBottom;
                state.placeToLeftX = action.payload.placeToLeftX;
            }
        },
        removeActiveDrag(state) {
            state.elementType = "";
            state.ID = -1;
            state.placeToTopY = -1;
            state.placeToRight = -1;
            state.placeToBottom = -1;
            state.placeToLeftX = -1
        }
    }
});


export const { setActiveDragElement, removeActiveDrag } = dragSlice.actions;
export default dragSlice.reducer;