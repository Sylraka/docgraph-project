import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { Card, Arrow, Board, LinkCard } from "./dataTypes"

export interface singleBoardInsideState {
    board: Board | undefined
}

const initialState: singleBoardInsideState = {
    board: undefined
}

export const fetchData = createAsyncThunk(
    //namespace, in axtraReducer we can reference to "fetchData.pending, fetchData.fulfilled, fetchData.rejected"
    'data/fetchData',
    // parameter of thunk: id
    async (id: string, thunkAPI) => {
        const response = await fetch(`http://localhost:5100/api/boards/${id}`);
        const data = await response.json();
        return data; // Das zurückgegebene Ergebnis wird in den Fulfilled-State übernommen
    }
);



//  async Thunk zum Aktualisieren eines Boards
export const updateBoardInDb = createAsyncThunk(
    'data/updateBoardInDb', // Der Action-Typ
    //parameter of thunk: updatedBoard
    async (updatedBoard: Board, { rejectWithValue }) => {
        try {
            // Baue den Pfad zum API-Endpunkt zusammen
            const response = await fetch(`http://localhost:5100/api/boards/${updatedBoard._id}`, {
                method: 'PUT', // HTTP-Methode, hier PUT für Updates
                headers: {
                    'Content-Type': 'application/json', // Stelle sicher, dass der Content-Type auf JSON gesetzt ist
                },
                body: JSON.stringify(updatedBoard), // Konvertiere das Board-Objekt in einen JSON-String
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json(); // Parsen der JSON-Antwort
            console.log("data:", data)
            return data; // Gib die aktualisierten Daten zurück
        } catch (error) {
            console.log(error)
            return rejectWithValue(error); // Fehlerbehandlung
        }
    }
);


// Dieser Thunk führt eine Datenbankabfrage durch und gibt das Ergebnis zurück
export const fetchBoardById = createAsyncThunk(
    'data/onlyFetchBoardById', // Typ für den Thunk
    async (boardId: string, { rejectWithValue }) => {
        try {
            const response = await fetch(`http://localhost:5100/api/boards/${boardId}`);
            
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

const singleBoardInsideSlice = createSlice({
    name: "singleBoardInside",
    initialState,
    reducers: {
        setLinkCardInside(state, action: PayloadAction<LinkCard>) {
            const cardIndex = state.board?.linkList.findIndex(link => link.fromArrowID === action.payload.fromArrowID);
            if (cardIndex !== undefined && state.board !== undefined) {
                state.board.linkList[cardIndex] = action.payload;
            }
        },
        // deleteLinkCardInside(state, action: PayloadAction<String>) {
        //     if (state.board !== undefined) {
        //         //fills all arrows in arrowlist where not having the arrowid we want to delete
        //         state.board.linkList = state.board?.linkList.filter(link => link.fromArrowID !== action.payload)
        //     }
        // },
        // addNewLinkCardInside(state, action: PayloadAction<LinkCard>) {
        //     // we cannot mutate the action-payload-object, so we make a new object
        //     const newLinkCard = {
        //         ...action.payload,
        //       //  cardID: state.board!.cardIDCounter
        //     }
        //    // state.board!.cardIDCounter++;
        //     //concat returns a new array, no modification inplace
        //     state.board!.linkList = state.board!.linkList.concat(newLinkCard)

        // },
        setSingleBoardInside(state, action: PayloadAction<Board>) {
            state.board = action.payload
        },

        setCardInside(state, action: PayloadAction<Card>) {
            const cardIndex = state.board?.cardList.findIndex(card => card.cardID === action.payload.cardID);
            if (cardIndex !== undefined && state.board !== undefined) {
                state.board.cardList[cardIndex] = action.payload;
            }
        },
        setArrowInside(state, action: PayloadAction<Arrow>) {
            const arrowIndex = state.board?.arrowList.findIndex(arrow => arrow.arrowID === action.payload.arrowID);
            if (arrowIndex !== undefined && state.board !== undefined) {
                state.board.arrowList[arrowIndex] = action.payload;
            }
        },
        deleteCardInside(state, action: PayloadAction<String>) {
            if (state.board !== undefined) {
                //fills all cards in cardlist where not having the cardid we want to delete
                state.board.cardList = state.board?.cardList.filter(card => card.cardID.toString() !== action.payload)
            }
        },
        deleteArrowInside(state, action: PayloadAction<String>) {
            if (state.board !== undefined) {
                //fills all arrows in arrowlist where not having the arrowid we want to delete
                state.board.arrowList = state.board?.arrowList.filter(arrow => arrow.arrowID.toString() !== action.payload)
            }
        },
        addNewCardInside(state, action: PayloadAction<Card>) {
            // we cannot mutate the action-payload-object, so we make a new object
            const newCard = {
                ...action.payload,
                cardID: state.board!.cardIDCounter
            }
            state.board!.cardIDCounter++;
            //concat returns a new array, no modification inplace
            state.board!.cardList = state.board!.cardList.concat(newCard)

        },
        addNewArrowInside(state, action: PayloadAction<Arrow>) {
            // we cannot mutate the action-payload-object, so we make a new object
            const newArrow = {
                ...action.payload,
                arrowID: state.board!.arrowIDCounter,
                anchorStart: {
                    ...action.payload.anchorStart,
                    anchorID: state.board!.anchorIDCounter
                  },
                  anchorEnd: {
                    ...action.payload.anchorEnd,
                    anchorID: state.board!.anchorIDCounter + 1
                  }
            }
            state.board!.anchorIDCounter += 2;
            state.board!.arrowIDCounter++;
            //concat returns a new array, no modification inplace
            state.board!.arrowList = state.board!.arrowList.concat(newArrow)
            //console.log("addNewArrow")
        },
        clearState(state) {
            state.board = undefined
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchData.pending, (state) => {
                // state.loading = true;
                // state.error = null;
            })
            .addCase(fetchData.fulfilled, (state, action) => {
                // state.loading = false;
                state.board = action.payload; // Daten in den State einfügen
            })
            .addCase(fetchData.rejected, (state, action) => {
                // state.loading = false;
                // state.error = action.error.message;
            })
            .addCase(updateBoardInDb.fulfilled, (state, action) => {
                //state.board = action.payload; // Daten in den State einfügen
            })
    }

});


export const { setSingleBoardInside, 
    setCardInside, setArrowInside, 
    clearState, 
    addNewCardInside, addNewArrowInside, 
    deleteArrowInside, deleteCardInside,
    setLinkCardInside
} = singleBoardInsideSlice.actions;
export default singleBoardInsideSlice.reducer;