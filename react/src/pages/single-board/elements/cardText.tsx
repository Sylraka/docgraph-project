

import { useState, useEffect } from "react"

import "./card.css"

import { useAppDispatch, useAppSelector } from "./../../../app/hooks"
import { Card } from '../../../app/fetch-data/dataTypes';



import { setCardInside, } from "./../singleBoardSlice"
import {removeFocusElement} from "./focusSlice"


interface canvasProps {
    card: Card;
}



export default function CardTextComponent(props: canvasProps) {
    const activeDragValue = useAppSelector((state) => state.drag)
    const dispatch = useAppDispatch()

    const [element, setElement] = useState<Card>({
        ...props.card,
        x: props.card.x + 60
    });


    //update width and height of a card (cardFocus is moving)
    useEffect(() => {
        if (activeDragValue.elementType === "card") {
            setTextPosition();
        }


        if (activeDragValue.elementType === "cardAnchorBottomRight" && activeDragValue.ID == element.cardID.toString()) {
            setElement(prevElement => ({
                ...prevElement,
                width: Math.max(prevElement.width + activeDragValue.width, 30),
                height: Math.max(prevElement.height + activeDragValue.height, 30)
            }))

        } else if (activeDragValue.elementType === "cardAnchorBottomLeft" && activeDragValue.ID == element.cardID.toString()) {
            setElement(prevElement => ({
                ...prevElement,
                x: prevElement.x + activeDragValue.width,
                width: Math.max(prevElement.width - activeDragValue.width, 30),
                height: Math.max(prevElement.height + activeDragValue.height, 30)
            }))

        } else if (activeDragValue.elementType === "cardAnchorTopRight" && activeDragValue.ID == element.cardID.toString()) {
            setElement(prevElement => ({
                ...prevElement,
                y: prevElement.y + activeDragValue.height,
                width: Math.max(prevElement.width + activeDragValue.width, 30),
                height: Math.max(prevElement.height - activeDragValue.height, 30)
            }))

        } else if (activeDragValue.elementType === "cardAnchorTopLeft" && activeDragValue.ID == element.cardID.toString()) {
            setElement(prevElement => ({
                ...prevElement,
                y: prevElement.y + activeDragValue.height,
                x: prevElement.x + activeDragValue.width,
                width: Math.max(prevElement.width - activeDragValue.width, 30),
                height: Math.max(prevElement.height - activeDragValue.height, 30)
            }))

        }



    }, [activeDragValue]);


    const manageTextInput = (value: string, fieldId: string) => {
        let newCard: Card;
        // let element = document.getElementById(fieldId) ;
        newCard = {
            ...props.card,
            text: value,
        }
        dispatch(setCardInside(newCard));
        setElement(prevElement => ({
            ...prevElement,
            text: value
        }))
    }

    const setTextPosition = () => {

        if (activeDragValue.ID === props.card.cardID.toString() && activeDragValue.elementType === "card") {
            setElement((prevElement) => ({
                ...prevElement,
                x: activeDragValue.placeToLeftX + 60,
                y: activeDragValue.placeToTopY
            }))
        }
    }

    const klickAtTextarea = () =>{
        dispatch(removeFocusElement())
    }

    return (
        <textarea
            key={props.card.cardID.toString()}
            id={"textID" + props.card.cardID}
            //className='text-element'
            className="text-element card-field-input no-cursor strong"
            style={{ 'top': element.y, 'left': element.x, 'width': element.width - 10, 'height': element.height - 10 }}
            onChange={(event) => manageTextInput(event.target.value, "textID" + props.card.cardID)}//
            onClick={klickAtTextarea}
            value={element.text}
        >

        </textarea>
    );
}