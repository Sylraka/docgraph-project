import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { Card, Arrow, Collection } from "./dataTypes"


export interface collectionsApiState {
    collections: Collection[] | undefined
    currentCollection: Collection | undefined
}

const initialState: collectionsApiState = {
    collections: undefined,
    currentCollection: undefined
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

// Dieser Thunk führt eine Datenbankabfrage durch und gibt das Ergebnis zurück
export const fetchCollectionById = createAsyncThunk(
    'data/fetchCollectionById', // Typ für den Thunk
    async (boardId: string, { rejectWithValue }) => {
        try {
            const response = await fetch(`http://localhost:5100/api/collections/${boardId}`);
            
            if (!response.ok) {
                throw new Error('Failed to fetch the board');
            }
            
            const data = await response.json();
            
            // Gib das Ergebnis zurück, ohne es in den Redux-State zu schreiben
            return data;
        } catch (error) {
            // Bei einem Fehler wird der Fehler zurückgegeben
            return rejectWithValue(error);
        }
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


//  async Thunk zum Aktualisieren aller Boards
export const updateCollectionInDb = createAsyncThunk(
    'data/updateCollectionInDb', // Der Action-Typ
    //parameter of thunk: updatedBoard
    async (updatedCollection: Collection, { rejectWithValue }) => {
        try {
            // Baue den Pfad zum API-Endpunkt zusammen
            const response = await fetch(`http://localhost:5100/api/collections/${updatedCollection._id}`, {
                method: 'PUT', // HTTP-Methode, hier PUT für Updates
                headers: {
                    'Content-Type': 'application/json', // Stelle sicher, dass der Content-Type auf JSON gesetzt ist
                },
                body: JSON.stringify(updatedCollection), // Konvertiere das Board-Objekt in einen JSON-String
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json(); // Parsen der JSON-Antwort
            console.log("data:", data)
       //    return data; // Gib die aktualisierten Daten zurück
        } catch (error) {
            console.log(error)
            //return rejectWithValue(error).payload; // Fehlerbehandlung
        }
    }
);



const collectionsApiSlice = createSlice({
    name: "collectionsApiSlice",
    initialState,
    reducers: {

        clearCurrentCollection(state) {
            state.currentCollection = undefined;
        },
        setCollectionName(state,  action: PayloadAction<string>) {
            state.currentCollection!.collectionName = action.payload;
        }
        // clearState(state) {
        //     state.board = undefined
        // }
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
            .addCase(fetchCollectionById.fulfilled, (state, action)=>{
                state.currentCollection = action.payload
            })


    }

});


export const { clearCurrentCollection, setCollectionName} = collectionsApiSlice.actions;
export default collectionsApiSlice.reducer;