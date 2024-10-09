import { useEffect, useState } from "react"

import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { setNavigationToMultiBoard } from "./../slices/navigationSlice"

//for insert new elements
import { useDrop } from "react-dnd";
import { ItemTypes } from '../../dragConstants';

import { Sidebar } from "./nav-bar/multiSidebar";

import { BoardMiniature } from "./boardMiniature";
import BoardMiniatureText from "./boardMiniatureText"
import "./multiBoard.css"

export const MultiBoard = () => {

    const dispatch = useAppDispatch()
    let data = useAppSelector(state => state.allBoards)


    useEffect(() => {
        dispatch(setNavigationToMultiBoard());
    }, [])





    // console.log(data);
    return (
        <>
            <div className="svg-multi-board-wrapper">
            <Sidebar />
                {/* <div style={{ 'width': "100px", 'height': "100px" }}></div> */}
                <svg
                    style={{ 'width': "2000px", 'height': "2000px" }}
                    className="svg-multi-board">
                    {data?.boards?.map(board => (
                        <BoardMiniature
                            key={"boardNr" + board._id}
                            board={board}
                        />

                    ))}

                </svg>
                {data?.boards?.map(board => (
                    <BoardMiniatureText
                        key={"boardTextNr" + board._id}
                        board={board}
                    />
                ))}
  
            </div>




        </>
    )

}





