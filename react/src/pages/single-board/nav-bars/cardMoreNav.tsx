

import { useState, useEffect } from "react"

import "./buttons/buttons.css"
import "./sidebar.scss"

import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { Card } from '../../../app/fetch-data/dataTypes';



import { setCardInside, } from "../singleBoardSlice"



interface canvasProps {
    card: Card;
}



export default function CardNavComponent(props: canvasProps) {
    const activeDragValue = useAppSelector((state) => state.drag)
    const dispatch = useAppDispatch()


    const [element, setElement] = useState<Card>({
        ...props.card,
        x: props.card.x + 170,
        y: props.card.y - 50
    });

    //update width and height of a card (cardFocus is moving)
    useEffect(() => {

        if (activeDragValue.elementType === "card") {
            setNavPosition();
        }


    }, [activeDragValue]);



    const setNavPosition = () => {
        if (activeDragValue.ID === props.card.cardID && activeDragValue.elementType === "card") {
            setElement((prevElement) => ({
                ...prevElement,
                x: activeDragValue.placeToLeftX + 170,
                y: activeDragValue.placeToTopY - 50
            }))
        }
    }



    const handleMathButton = () => {

    }


    return (
        <div className="cardMoreNav"
            style={{ 'top': element.y, 'left': element.x, }}>
            <button className="button-general cardMoreButton"
                onPointerDown={handleMathButton}>
                math
            </button>
        </div>
    );
}