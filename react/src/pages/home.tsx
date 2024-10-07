import { useState, useEffect, Key } from "react";
import { Link } from "react-router-dom";

import { useNavigate } from 'react-router-dom';
import { fetchAllBoards } from "../app/fetch-data/allBoardsSlice"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { clearState } from "../app/fetch-data/singleBoardSlice"
import { SavedBoards } from "./savedBoards"


import { createNewBoard } from '../app/fetch-data/allBoardsSlice.js'
import { newBoardData } from "../app/newBoardData.js"

import {MultiBoard} from "./multi-board/multiBoard"

import "./../general-styles.css"

export const Home = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch()
    const navigation = useAppSelector(state => state.navigation.nav)

    useEffect(() => {
        dispatch(fetchAllBoards())
        dispatch(clearState())
    },
        []);

        //await is onjly allowed in async methods
    const handleCreateBoard = async () => {
        const newBoard = newBoardData

        try {
            // Dispatch Thunk und warte auf die Antwort, 
            const resultAction = await dispatch(createNewBoard(newBoard));

            // Wenn der Thunk erfolgreich war, navigiere zu einer neuen Seite
            if (createNewBoard.fulfilled.match(resultAction)) {
                // Beispiel: Navigiere zur neuen Board-Seite nach erfolgreicher Erstellung
                navigate(`/board/${resultAction.payload._id}`);
            } else {
                // Fehlerbehandlung
                console.log('Error creating board:', resultAction.payload);
            }

        } catch (error) {
            console.error("failed to create board")
        }
    }
    if (navigation==="home") {
    return (
        <div className='background'>
            <div className='placeholder-1'></div>




            <div className="row" id="content">
                <header className="border-horizontal">
                    <h1>You're Welcome</h1>
                    <p>find your information in the bricks</p>
                </header>
                <main className="flex-wrapper border-horizontal">
                    <div className="brick flex-content "
                        onClick={handleCreateBoard}>
                        <p className="brick-content">create new board</p>
    
                    </div>
                </main >



                <h4>saved Bricks</h4>
                <div className="buttonbar-wrapper">
                    {/* <DropdownButton labels={['id', 'x']} clickElem={changeSort} />*/}
                </div>
                <div className="flex-wrapper">
                    <SavedBoards sortBy={0} />
                </div>

            </div>



        </div>
    );} else {
        return(
            <MultiBoard/>
        );
    }
}


