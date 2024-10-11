import type { Action, ThunkAction } from "@reduxjs/toolkit"
import { combineSlices, configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"

import dragReducer from "../pages/slices/dragSlice"
import focusReducer from "../pages/slices/focusSlice"
import overCardReducer from "../pages/slices/overCardSlice" 
import singleBoardReducer from "./fetch-data/singleBoardSlice"
import allBoardsReducer from "./fetch-data/allBoardsSlice"
import navigationReducer from "../pages/slices/navigationSlice"
import multiBoardArrowReducer from "./fetch-data/multiBoardArrowSlice"

export const store = configureStore({
    reducer: {
      drag: dragReducer,
      focus: focusReducer,
      overCard: overCardReducer,
      singleBoard: singleBoardReducer,
      allBoards: allBoardsReducer,
      navigation: navigationReducer,
      multiBoardArrow: multiBoardArrowReducer
      
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

