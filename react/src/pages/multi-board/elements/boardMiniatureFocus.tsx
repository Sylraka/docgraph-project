import { useState, useEffect } from "react";

import { Board } from '../../../app/fetch-data/dataTypes';

//we need that to read the state
import { useAppDispatch, useAppSelector } from '../../../app/hooks'; // path to custom Hook
import { setActiveDragElement, removeActiveDrag, DragState } from "../../slices/dragSlice"
import overCardSlice, { setOverCard, removeOverCard } from "../../slices/overCardSlice"

import { setArrowInside } from "../../../app/fetch-data/singleBoardSlice"
import { aC } from "vitest/dist/reporters-LqC_WI4d.js";


type propTypes = {
    board: Board,
    //handleWidthHeight:(newWidth: number, newHeight: number) => void
};

interface DragElement extends Board {
    active: boolean;
    offsetX: number;
    offsetY: number;
}



export const BoardMiniatureFocus = (props: propTypes) => {
    let activeDragValue = useAppSelector(state => state.drag)
    const dispatch = useAppDispatch()


    const [element, setElement] = useState<DragElement>({
        // the attributes the cards didnt have
        ...props.board,
        active: false,
        offsetX: -1, //place between element left and mouse
        offsetY: -1, // place between element top and mouse   
    });

    useEffect(() => {
        if (activeDragValue.elementType === "board") {
            setElement(prevElement => ({
                ...prevElement,
                boardPosition: {
                    x: activeDragValue.placeToLeftX + 100,
                    y: activeDragValue.placeToTopY + 50
                }
            }))
        }
    }, [activeDragValue])



    return (
        <>
            <g
            >
                <circle
                    r="6"
                    cx={element.boardPosition.x - 70}
                    cy={element.boardPosition.y - 35}
                    fill='#3399ff'
                    stroke='white'
                    strokeWidth='1'
                    className='focusPoints'
                >
                </circle>
                <circle
                    r="6"
                    cx={element.boardPosition.x + 70}//elementTopRight.width + 30}
                    cy={element.boardPosition.y - 35}
                    fill='#3399ff'
                    stroke='white'
                    strokeWidth='1'
                    className='focusPoints'
                >
                </circle>
                <circle
                    r="6"
                    cx={element.boardPosition.x - 70}
                    cy={element.boardPosition.y + 35}//elementBottomLeft.height + 30}
                    fill='#3399ff'
                    stroke='white'
                    strokeWidth='1'
                    className='focusPoints'
                >
                </circle>
                <circle
                    r="6"
                    cx={element.boardPosition.x + 70}//elementBottomRight.width + 30}
                    cy={element.boardPosition.y + 35}//elementBottomRight.height + 30}
                    fill='#3399ff'
                    stroke='white'
                    strokeWidth='1'
                    className='focusPoints'
                >
                </circle>



            </g>
        </>
    );
};

