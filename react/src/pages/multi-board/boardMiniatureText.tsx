


import { useState, useEffect } from "react"


import { useAppDispatch, useAppSelector } from "./../../app/hooks"
import { Board } from '../../app/fetch-data/dataTypes';




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
    }

    const setTextPosition = () => {

        if (activeDragValue.ID === props.board._id && activeDragValue.elementType === "board") {
            setElement((prevElement) => ({
                ...prevElement,
                boardPosition: {
                    x: activeDragValue.placeToLeftX + 60,
                    y: activeDragValue.placeToTopY
                }
            }))
        }
    }

    // const klickAtTextarea = () => {
    //     dispatch(removeFocusElement())
    // }

    return (
        <textarea
            key={props.board._id}
            id={"textID" + props.board._id}
            //className='text-element'
            className="text-element card-field-input no-cursor strong"
            style={{ 'top': element.boardPosition.y, 'left': element.boardPosition.x, 'width': element.width - 10, 'height': element.height - 10 }}
            onChange={(event) => manageTextInput(event.target.value, "textID" + props.board._id)}//
            // onClick={klickAtTextarea}
            value={element.boardName}
        >

        </textarea>
    );
}