import type { Action, ThunkAction } from "@reduxjs/toolkit"
import { combineSlices, configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"

import dragReducer from "../pages/single-board/elements/dragSlice"
import focusReducer from "../pages/single-board/elements/focusSlice"
import overCardReducer from "../pages/single-board/elements/overCardSlice" 
import singleBoardReducer from "../pages/single-board/singleBoardSlice"

export const store = configureStore({
    reducer: {
      drag: dragReducer,
      focus: focusReducer,
      overCard: overCardReducer,
      singleBoard: singleBoardReducer,

      // [boardsApiSlice.reducerPath]: boardsApiSlice.reducer,
    },

    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: getDefaultMiddleware => {
      return getDefaultMiddleware()
      // .concat(boardsApiSlice.middleware)
    },
  
  })


//export from types for zustand and dispatch
export type RootState = ReturnType<typeof store.getState>; 

// Infer the `AppDispatch` type from the store itself
export type AppDispatch = typeof store.dispatch;

