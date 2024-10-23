import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { Card, Arrow, Collection } from "./dataTypes"


export interface collectionsApiState {
    collections: Collection[] | undefined
}

const initialState: collectionsApiState = {
    collections: undefined
}

export const fetchAllCollections = createAsyncThunk(
    //namespace, in axtraReducer we can reference to "fetchData.pending, fetchData.fulfilled, fetchData.rejected"
    'data/fetchAllCollections',
    // parameter of thunk: id
    async (thunkAPI) => {
        const response = await fetch(`http://localhost:5100/api/collections`);
        const data = await response.json();
       // console.log(data)
        return data; // Das zurückgegebene Ergebnis wird in den Fulfilled-State übernommen
    }
);

export const createNewCollection = createAsyncThunk(
    'data/postDataNewCollection',
       //parameter of thunk: newBoard
    async (newBoard: any) => {
         // Baue den Pfad zum API-Endpunkt zusammen
         const response = await fetch(`http://localhost:5100/api/collections`, {
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
        // das board wird als payload zurück gegeben
        return data
        console.log("data:", data)

    }
)






const collectionsApiSlice = createSlice({
    name: "collectionsApiSlice",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllCollections.pending, (state) => {
                // state.loading = true;
                // state.error = null;
            })
            .addCase(fetchAllCollections.fulfilled, (state, action) => {
                // state.loading = false;
                state.collections = action.payload; // Daten in den State einfügen
            })
            .addCase(fetchAllCollections.rejected, (state, action) => {
                // state.loading = false;
                // state.error = action.error.message;
            })  
            .addCase(createNewCollection.fulfilled, (state, action) => {
                // we cannot mutate the action-payload-object, so we make a new object
                const newCollection = {
                    ...action.payload,
                }
                //concat returns a new array, no modification inplace
                state.collections = state.collections!.concat(newCollection)
            })


    }

});


export const {  } = collectionsApiSlice.actions;
export default collectionsApiSlice.reducer;