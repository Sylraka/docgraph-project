import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface DragState {
    elementType: string,
    ID: number,
    placeToLeftX: number,
    placeToTopY: number,
    width: number,
    height: number,
}

const initialState: DragState = {
    elementType: "",
    ID: -1,
    placeToLeftX: -1,
    placeToTopY: -1,
    width: -1,
    height: -1,
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
                state.placeToLeftX = action.payload.placeToLeftX;
                state.placeToTopY = action.payload.placeToTopY;
                state.width = action.payload.width;
                state.height = action.payload.height;

            }
        },
        removeActiveDrag(state) {
            state.elementType = "";
            state.ID = -1;
            state.placeToLeftX = -1;
            state.placeToTopY = -1;
            state.width = -1;
            state.height = -1;
        }
    }
});


export const { setActiveDragElement, removeActiveDrag } = dragSlice.actions;
export default dragSlice.reducer;