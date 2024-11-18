

import { useState, useEffect } from "react"

import "./buttons/buttons.css"
import "./sidebar.scss"

import { useAppDispatch, useAppSelector } from "../app/hooks"
import { Card } from '../app/fetch-data/dataTypes';



import { setCardInside, } from "../app/fetch-data/singleBoardSlice"



interface canvasProps {
    card: Card;
}

interface NavElement extends Card {
    isMathOn: boolean
}


export default function CardNavComponent(props: canvasProps) {
    const activeDragValue = useAppSelector((state) => state.drag)
    const dispatch = useAppDispatch()


    const [element, setElement] = useState<NavElement>({
        ...props.card,
        x: props.card.x + 170,
        y: props.card.y - 50,
        isMathOn: false
    });

    //update width and height of a card (cardFocus is moving)
    useEffect(() => {

        if (activeDragValue.elementType === "card") {
            setNavPosition();
        }


    }, [activeDragValue]);
    useEffect(() => {
        props.card.cardTypes.map(cardType => {
            if (cardType === 'math') {
                setElement(prevElement => ({
                    ...prevElement,
                    isMathOn: true
                }))
            }
        });
    }, []);


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
        if (element.isMathOn === true) {
            setElement(prevElement=>({
                ...prevElement,
                isMathOn: false
            }))

            let updatedCard = {
                ...props.card,
                cardTypes: props.card.cardTypes.filter(cardType => cardType !== "math")
            }
            dispatch(setCardInside(updatedCard));
        } else {
            setElement(prevElement=>({
                ...prevElement,
                isMathOn: true
            }))

            let updatedCard = {
                ...props.card,
                cardTypes: props.card.cardTypes.concat("math")
            }
            dispatch(setCardInside(updatedCard));
        }

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