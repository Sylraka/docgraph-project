import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { multiBoardArrow } from "./dataTypes"

export interface multiBoardArrowState {
    multiBoardArrows: multiBoardArrow [] | undefined
}

const initialState: multiBoardArrowState = {
    multiBoardArrows: undefined
}

export const fetchAllArrows = createAsyncThunk(
    //namespace, in axtraReducer we can reference to "fetchData.pending, fetchData.fulfilled, fetchData.rejected"
    'data/fetchAllArrows',
    // parameter of thunk: id
    async (thunkAPI) => {
        const response = await fetch(`http://localhost:5100/api/arrows`);
        const data = await response.json();
       // console.log(data)
        return data; // Das zurückgegebene Ergebnis wird in den Fulfilled-State übernommen
    }
);

export const createNewArrow = createAsyncThunk(
    'data/postData',
       //parameter of thunk: newArrow
    async (newArrow: any) => {
         // Baue den Pfad zum API-Endpunkt zusammen
         const response = await fetch(`http://localhost:5100/api/arrows`, {
            method: 'POST', // HTTP-Methode, hier POST 
            headers: {
                'Content-Type': 'application/json', // Stelle sicher, dass der Content-Type auf JSON gesetzt ist
            },
            body: JSON.stringify(newArrow), // Konvertiere das Board-Objekt in einen JSON-String
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json(); // Parsen der JSON-Antwort
        // das board wird als payload zurück gegeben
        console.log("data:", data)
        return data
    }
)

// //  async Thunk zum Aktualisieren aller Arrows
export const updateArrowsInDb = createAsyncThunk(
    'data/updateArrowsInDb', // Der Action-Typ
    //parameter of thunk: updatedArrows
    async (updatedArrows: any, { rejectWithValue }) => {
        try {
            // Baue den Pfad zum API-Endpunkt zusammen
            const response = await fetch(`http://localhost:5100/api/arrows/`, {
                method: 'PUT', // HTTP-Methode, hier PUT für Updates
                headers: {
                    'Content-Type': 'application/json', // Stelle sicher, dass der Content-Type auf JSON gesetzt ist
                },
                body: JSON.stringify(updatedArrows), // Konvertiere das Board-Objekt in einen JSON-String
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


const arrowsApiSlice = createSlice({
    name: "arrowsApiSlice",
    initialState,
    reducers: {
        setBoard(state, action: PayloadAction<multiBoardArrow>) {
            const arrowIndex = state.multiBoardArrows?.findIndex(arrow => arrow._id === action.payload._id);
            if (arrowIndex !== undefined && state.multiBoardArrows !== undefined) {
                state.multiBoardArrows[arrowIndex] = action.payload;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllArrows.pending, (state) => {
                // state.loading = true;
                // state.error = null;
            })
            .addCase(fetchAllArrows.fulfilled, (state, action) => {
                // state.loading = false;
                state.multiBoardArrows = action.payload; // Daten in den State einfügen
            })
            .addCase(fetchAllArrows.rejected, (state, action) => {
                // state.loading = false;
                // state.error = action.error.message;
            })  
    }

});


export const { setBoard } = arrowsApiSlice.actions;
export default arrowsApiSlice.reducer;