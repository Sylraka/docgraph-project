

import { useState, useEffect } from "react"

import "./card.css"

import { useAppDispatch, useAppSelector } from "./../../../app/hooks"
import { Card } from '../../../app/fetch-data/dataTypes';






interface canvasProps {
    card: Card;
}



export default function CardTextComponent(props: canvasProps) {
    const activeDragValue = useAppSelector((state) => state.drag)

    const [element, setElement] = useState<Card>({
        ...props.card
    });
    
    useEffect(() => {
        setTextPosition();
    },[activeDragValue])





    const setTextPosition = () => {
    
        if (activeDragValue.ID === props.card.cardID && activeDragValue.elementType === "card"){
            setElement((prevElement) => ({
                ...prevElement,
                x: activeDragValue.placeToLeftX,
                y: activeDragValue.placeToTopY
            }))
        }
    }

    return(
        <p
        key={props.card.cardID.toString()}
        className='text-element'
        style={{ 'top': element.y, 'left': element.x, 'width': element.width - 10, 'height': element.height - 40 }}
    >
        {element.text}
    </p>
    );
}