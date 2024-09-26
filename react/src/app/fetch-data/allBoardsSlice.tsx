import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { Card, Arrow, Board } from "./dataTypes"

export interface boardsApiState {
    boards: Board [] | undefined
}

const initialState: boardsApiState = {
    boards: undefined
}

export const fetchAllBoards = createAsyncThunk(
    //namespace, in axtraReducer we can reference to "fetchData.pending, fetchData.fulfilled, fetchData.rejected"
    'data/fetchAllBoards',
    // parameter of thunk: id
    async (thunkAPI) => {
        const response = await fetch(`http://localhost:5100/api/boards`);
        const data = await response.json();
       // console.log(data)
        return data; // Das zurückgegebene Ergebnis wird in den Fulfilled-State übernommen
    }
);

export const createNewBoard = createAsyncThunk(
    'data/postData',
       //parameter of thunk: newBoard
    async (newBoard: any) => {
         // Baue den Pfad zum API-Endpunkt zusammen
         const response = await fetch(`http://localhost:5100/api/boards`, {
            method: 'POST', // HTTP-Methode, hier POST 
            headers: {
                'Content-Type': 'application/json', // Stelle sicher, dass der Content-Type auf JSON gesetzt ist
            },
            body: JSON.stringify(newBoard), // Konvertiere das Board-Objekt in einen JSON-String
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json(); // Parsen der JSON-Antwort
        return data
        console.log("data:", data)

    }
)



const boardsApiSlice = createSlice({
    name: "boardsApiSlice",
    initialState,
    reducers: {
        
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllBoards.pending, (state) => {
                // state.loading = true;
                // state.error = null;
            })
            .addCase(fetchAllBoards.fulfilled, (state, action) => {
                // state.loading = false;
                state.boards = action.payload; // Daten in den State einfügen
            })
            .addCase(fetchAllBoards.rejected, (state, action) => {
                // state.loading = false;
                // state.error = action.error.message;
            })
    }

});


export default boardsApiSlice.reducer;