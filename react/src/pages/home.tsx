import { useState, useEffect, Key } from "react";
import { Link } from "react-router-dom";

import { useNavigate } from 'react-router-dom';
import { fetchAllBoardsFromCollection } from "../app/fetch-data/allBoardsSlice"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { clearState } from "../app/fetch-data/singleBoardSlice"
import { SavedCollections } from "./savedCollections"
import { CollectionData } from "../app/newElementData"

import {MultiBoard} from "./multi-board/multiBoard"

import "./../general-styles.css"
import { createNewCollection, fetchAllCollections } from "../app/fetch-data/collectionSlice";
import { setNavigationToHome } from "./slices/navigationSlice";

export const Home = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch()
    const navigation = useAppSelector(state => state.navigation.nav)

    useEffect(() => {
        dispatch(fetchAllCollections())
        dispatch(clearState())
        dispatch(setNavigationToHome())
     //   dispatch(fetchAllArrows())
    },
        []);

        //await is onjly allowed in async methods
    const handleCreateCollection = async () => {
        const newCollection = CollectionData

        try {
            // Dispatch Thunk und warte auf die Antwort, 
            const resultAction = await dispatch(createNewCollection(newCollection));

            // Wenn der Thunk erfolgreich war, navigiere zu einer neuen Seite
            if (createNewCollection.fulfilled.match(resultAction)) {
                // Beispiel: Navigiere zur neuen Board-Seite nach erfolgreicher Erstellung
                navigate(`/${resultAction.payload._id}`);
            } else {
                // Fehlerbehandlung
                console.log('Error creating collection:', resultAction.payload);
            }

        } catch (error) {
            console.error("failed to create collection")
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
                        onClick={handleCreateCollection}>
                        <p className="brick-content">create new collection</p>
    
                    </div>
                </main >



                <h4>saved Collections</h4>
                <div className="buttonbar-wrapper">
                    {/* <DropdownButton labels={['id', 'x']} clickElem={changeSort} />*/}
                </div>
                <div className="flex-wrapper">
                    <SavedCollections sortBy={0} />
                </div>

            </div>



        </div>
    );} else {
        return(
            <MultiBoard/>
        );
    }
}


