import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface canvasSize {
    width: number;
    height:number;
}

const initialState: canvasSize = {
    width: -1,
    height: -1
}

const canvasSizeSlice = createSlice({
    name: "canvasSize",
    initialState,
    reducers: {
        setCanvasSize(state, action: PayloadAction<canvasSize>) {
            state.width = action.payload.width;
            state.height = action.payload.height;
           
        },
    }
});


export const { setCanvasSize  } = canvasSizeSlice.actions;
export default canvasSizeSlice.reducer;