


import { useState, useEffect } from "react"


import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { Board } from '../../../app/fetch-data/dataTypes';
import { Link } from "react-router-dom";

import "../multiBoard.css"
import linkImg from "../../../images/link.png"

import { setBoard } from "../../../app/fetch-data/allBoardsSlice";
import { removeFocusElement } from "../../slices/focusSlice";

interface canvasProps {
    board: Board;
}

interface boardMiniatureElement extends Board {
    width: number,
    height: number
}

export default function BoardMiniatureTextComponent(props: canvasProps) {
    const activeDragValue = useAppSelector((state) => state.drag)
    const dispatch = useAppDispatch()

    const [element, setElement] = useState<boardMiniatureElement>({
        ...props.board,
        width: 100,
        height: 100
    });


    //update width and height of a card (cardFocus is moving)
    useEffect(() => {
        if (activeDragValue.elementType === "board") {
            setTextPosition();
        }


        // if (activeDragValue.elementType === "cardAnchorBottomRight" && activeDragValue.ID == element._id) {
        //     setElement(prevElement => ({
        //         ...prevElement,
        //         width: Math.max(prevElement.width + activeDragValue.width, 30),
        //         height: Math.max(prevElement.height + activeDragValue.height, 30)
        //     }))

        // } else if (activeDragValue.elementType === "cardAnchorBottomLeft" && activeDragValue.ID == element._id) {
        //     setElement(prevElement => ({
        //         ...prevElement,
        //         x: prevElement.x + activeDragValue.width,
        //         width: Math.max(prevElement.width - activeDragValue.width, 30),
        //         height: Math.max(prevElement.height + activeDragValue.height, 30)
        //     }))

        // } else if (activeDragValue.elementType === "cardAnchorTopRight" && activeDragValue.ID == element._id) {
        //     setElement(prevElement => ({
        //         ...prevElement,
        //         y: prevElement.y + activeDragValue.height,
        //         width: Math.max(prevElement.width + activeDragValue.width, 30),
        //         height: Math.max(prevElement.height - activeDragValue.height, 30)
        //     }))

        // } else if (activeDragValue.elementType === "cardAnchorTopLeft" && activeDragValue.ID == element._id) {
        //     setElement(prevElement => ({
        //         ...prevElement,
        //         y: prevElement.y + activeDragValue.height,
        //         x: prevElement.x + activeDragValue.width,
        //         width: Math.max(prevElement.width - activeDragValue.width, 30),
        //         height: Math.max(prevElement.height - activeDragValue.height, 30)
        //     }))

        // }



    }, [activeDragValue]);


    const manageTextInput = (value: string, fieldId: string) => {
        let newBoard: Board;
        // let element = document.getElementById(fieldId) ;
        newBoard = {
            ...props.board,
            boardName: value,
        }
        // dispatch(setCardInside(newCard));
        setElement(prevElement => ({
            ...prevElement,
            boardName: value
        }))

        dispatch(setBoard({
            ...props.board,
            boardName: value
        }))
    }


    const setTextPosition = () => {

        if (activeDragValue.ID === props.board._id && activeDragValue.elementType === "board") {
            setElement((prevElement) => ({
                ...prevElement,
                boardPosition: {
                    x: activeDragValue.placeToLeftX + 100,
                    y: activeDragValue.placeToTopY + 50
                }
            }))
        }
    }

    const klickAtTextarea = () => {
        dispatch(removeFocusElement())
    }

    return (
        <>
            <textarea
                key={props.board._id}
                id={"textID" + props.board._id}
                //className='text-element'
                className="multi-board-text-element text-element card-field-input"//
                spellCheck="false"
                style={{ 'top': element.boardPosition.y - 75, 'left': element.boardPosition.x - (element.width - 10), 'width': element.width, 'height': element.height -20 }}
                onChange={(event) => manageTextInput(event.target.value, "textID" + props.board._id)}//
                 onClick={klickAtTextarea}
                value={element.boardName}
            >
            </textarea>
            <Link to={{
                pathname: "/board/" + props.board._id
            }} className="">

                <img className="link-image" alt="go to board" src={linkImg}
                    style={{ 'top': element.boardPosition.y - (22), 'left': element.boardPosition.x - 100 }}
                />
            </Link>
        </>
    );
}