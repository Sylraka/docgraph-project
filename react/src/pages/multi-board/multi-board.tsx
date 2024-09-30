import { useEffect, useState } from "react"

import { useAppDispatch, useAppSelector } from "../../app/hooks"


//for insert new elements
import { useDrop } from "react-dnd";
import { ItemTypes } from './../../dragConstants';


import "./multi-board.css"

export const MultiBoard = () => {

    const dispatch = useAppDispatch()



    useEffect(() => {

    }, [])





    // console.log(data);
    return (
        <>
            <div className="svg-multi-board-wrapper">
                <svg className="svg-multi-board">
                </svg>
            </div>


        </>
    )

}





