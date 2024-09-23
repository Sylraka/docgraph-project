

import { useState, useEffect } from "react"

import "./card.css"

import { useAppDispatch, useAppSelector } from "./../../../app/hooks"
import { Card } from '../../../app/fetch-data/dataTypes';



import { setCardInside, } from "./../singleBoardSlice"



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


        if (activeDragValue.elementType === "cardAnchorBottomRight" && activeDragValue.ID == element.cardID) {
            setElement(prevElement => ({
                ...prevElement,
                width: Math.max(prevElement.width + activeDragValue.width, 30),
                height: Math.max(prevElement.height + activeDragValue.height, 30)
            }))

        } else if (activeDragValue.elementType === "cardAnchorBottomLeft" && activeDragValue.ID == element.cardID) {
            setElement(prevElement => ({
                ...prevElement,
                x: prevElement.x + activeDragValue.width,
                width: Math.max(prevElement.width - activeDragValue.width, 30),
                height: Math.max(prevElement.height + activeDragValue.height, 30)
            }))

        } else if (activeDragValue.elementType === "cardAnchorTopRight" && activeDragValue.ID == element.cardID) {
            setElement(prevElement => ({
                ...prevElement,
                y: prevElement.y + activeDragValue.height,
                width: Math.max(prevElement.width + activeDragValue.width, 30),
                height: Math.max(prevElement.height - activeDragValue.height, 30)
            }))

        } else if (activeDragValue.elementType === "cardAnchorTopLeft" && activeDragValue.ID == element.cardID) {
            setElement(prevElement => ({
                ...prevElement,
                y: prevElement.y + activeDragValue.height,
                x: prevElement.x + activeDragValue.width,
                width: Math.max(prevElement.width - activeDragValue.width, 30),
                height: Math.max(prevElement.height - activeDragValue.height, 30)
            }))

        }



    }, [activeDragValue]);


    const manageTextInput= (fieldId: string) => {
        let newCard:Card;
        let element = document.getElementById(fieldId) as HTMLTextAreaElement;
        newCard= {
            ...props.card,
            text: element!.value,
        }
        dispatch(setCardInside(newCard));
    }

    const setTextPosition = () => {

        if (activeDragValue.ID === props.card.cardID && activeDragValue.elementType === "card") {
            setElement((prevElement) => ({
                ...prevElement,
                x: activeDragValue.placeToLeftX + 60,
                y: activeDragValue.placeToTopY
            }))
        }
    }

    return (
        <textarea
            key={props.card.cardID.toString()}
            id={"textID" + props.card.cardID}
            //className='text-element'
            className="text-element card-field-input no-cursor strong"
            style={{ 'top': element.y, 'left': element.x, 'width': element.width - 10, 'height': element.height - 10 }}
            onInput={() => manageTextInput("textID" + props.card.cardID)}//
        >
            {element.text}
        </textarea>
    );
}