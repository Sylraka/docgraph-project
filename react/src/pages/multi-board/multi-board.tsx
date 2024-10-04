import { useEffect, useState } from "react"

import { useAppDispatch, useAppSelector } from "../../app/hooks"


//for insert new elements
import { useDrop } from "react-dnd";
import { ItemTypes } from './../../dragConstants';

import { BoardMiniature } from "./boardMiniature";
import  BoardMiniatureText  from "./boardMiniatureText"
import "./multi-board.css"

export const MultiBoard = () => {

    const dispatch = useAppDispatch()
    let data = useAppSelector(state => state.allBoards)


    useEffect(() => {

    }, [])





    // console.log(data);
    return (
        <>
            <div className="svg-multi-board-wrapper">
                <div style={{ 'width': "100px", 'height': "100px" }}></div>
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





