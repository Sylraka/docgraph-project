import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { Card, Arrow, Board } from "./dataTypes"

export interface boardsApiState {
    boards: Board [] | undefined
}

const initialState: boardsApiState = {
    boards: undefined
}

export const fetchAllBoardsFromCollection = createAsyncThunk(
    //namespace, in axtraReducer we can reference to "fetchData.pending, fetchData.fulfilled, fetchData.rejected"
    'data/fetchAllBoards',
    // parameter of thunk: id
    async ({ collectionID }: { collectionID: string }, thunkAPI) => {
        console.log("collectionID:",collectionID)
        const response = await fetch(`http://localhost:5100/api/boards?collectionID=${collectionID}`);
        const data = await response.json();
       // console.log(data)
        return data; // Das zurückgegebene Ergebnis wird in den Fulfilled-State übernommen
    }
);

export const createNewBoard = createAsyncThunk(
    'data/postDataNewBoard',
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
        // das board wird als payload zurück gegeben
        return data
        console.log("data:", data)

    }
)

//  async Thunk zum Aktualisieren aller Boards
export const updateBoardsInDb = createAsyncThunk(
    'data/updateBoardsInDb', // Der Action-Typ
    //parameter of thunk: updatedBoard
    async (updatedBoards: any, { rejectWithValue }) => {
        try {
            // Baue den Pfad zum API-Endpunkt zusammen
            const response = await fetch(`http://localhost:5100/api/boards/`, {
                method: 'PUT', // HTTP-Methode, hier PUT für Updates
                headers: {
                    'Content-Type': 'application/json', // Stelle sicher, dass der Content-Type auf JSON gesetzt ist
                },
                body: JSON.stringify(updatedBoards), // Konvertiere das Board-Objekt in einen JSON-String
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

export const deleteBoardFromDb = createAsyncThunk(
    'data/deleteBoardFromDb',
    async (boardID: string, { rejectWithValue }) => {
        try {
            // Baue den Pfad zum API-Endpunkt mit dem Arrow-ID zusammen
            const response = await fetch(`http://localhost:5100/api/boards/${boardID}`, {
                method: 'DELETE',
            });
            //console.log(response)
            if (!response.ok) {
                throw new Error(`Network response was not ok ${response.statusText}`);
            }

            return boardID; // Arrow-ID wird als Payload zurückgegeben, um sie aus dem Redux-State zu entfernen
        } catch (error) {
            console.log(error)
        }
    }
);


const boardsApiSlice = createSlice({
    name: "boardsApiSlice",
    initialState,
    reducers: {
        setBoard(state, action: PayloadAction<Board>) {
            const boardIndex = state.boards?.findIndex(board => board._id === action.payload._id);
            if (boardIndex !== undefined && state.boards !== undefined) {
                state.boards[boardIndex] = action.payload;
            }
        },
        // deleteBoardInside(state, action: PayloadAction<String>) {
        //     if (state.boards !== undefined) {
        //         //fills all boards in boardLiust where not having the arrowid we want to delete
        //         state.boards = state.boards?.filter(board => board._id !== action.payload)
        //     }
        // },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllBoardsFromCollection.pending, (state) => {
                // state.loading = true;
                // state.error = null;
            })
            .addCase(fetchAllBoardsFromCollection.fulfilled, (state, action) => {
                // state.loading = false;
                state.boards = action.payload; // Daten in den State einfügen
            })
            .addCase(fetchAllBoardsFromCollection.rejected, (state, action) => {
                // state.loading = false;
                // state.error = action.error.message;
            })  
            .addCase(createNewBoard.fulfilled, (state, action) => {
                // we cannot mutate the action-payload-object, so we make a new object
                const newCard = {
                    ...action.payload,
                }
                //concat returns a new array, no modification inplace
                state.boards = state.boards!.concat(newCard)
            })
            .addCase(deleteBoardFromDb.fulfilled, (state, action) => {
                if (state.boards !== undefined) {
                    //fills all boards in boardlist where not having the arrowid we want to delete
                    state.boards = state.boards?.filter(board => board._id !== action.payload)
                }
            })

    }

});


export const { setBoard } = boardsApiSlice.actions;
export default boardsApiSlice.reducer;