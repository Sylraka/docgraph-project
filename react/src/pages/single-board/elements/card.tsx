//draggable https://www.npmjs.com/package/react-draggable#react-draggable
import { useState, useRef, useEffect } from "react";
import { Card } from '../../../app/fetch-data/dataTypes';
import './card.css';

import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';

import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { setActiveDragElement, removeActiveDrag, DragState } from "./dragSlice"
import { setFocusElement } from "./focusSlice"
import { setOverCard } from "./overCardSlice"

interface canvasProps {
    card: Card,
    boardId: string,
    saveCard: (param: Card) => void,
}


//the attributes we need to drag plus the card attributes
interface DragElement extends Card {
    active: boolean;
    offsetX: number;
    offsetY: number;
}

export default function CardComponent(props: canvasProps) {
    const dispatch = useAppDispatch()
    //const activeDragValue = useAppSelector((state) => state.drag)




    const [element, setElement] = useState<DragElement>({
        // the attributes the cards didnt have
        ...props.card,
        active: false,
        offsetX: -1, //place between element left and mouse
        offsetY: -1, // place between element top and mouse   

    });

    //fill in the cards when they are loaded
    // useEffect(() => {
    //     // setElement({
    //     //     ...props.card,
    //     //     active: false,
    //     //     movedLeftX: -1, // Initialwert für xOffset
    //     //     movedTopY: -1, // Initialwert für yOffset
    //     // })

    //     // props.cardState.cardTypes.map(cardType => {
    //     //   if (cardType === 'math') {
    //     //     setIsMathOn(true)
    //     //   }
    //     // });
    // }, [props]);



    function handlePointerDown(e: React.PointerEvent<SVGElement>) {
        dispatch(setFocusElement({ elementType: "card", ID: props.card.cardID }))
        let newElement: DragElement;
        const el = e.currentTarget;
        const bbox = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - bbox.left;
        const y = e.clientY - bbox.top;
        el.setPointerCapture(e.pointerId);
        newElement = { ...element, offsetX: x, offsetY: y, active: true };
        setElement(newElement);
    }

    function handlePointerMove(e: React.PointerEvent<SVGElement>) {

        if (element.active === true) {

            //for redux-state "dragState"
            // get position without margin, but with padding, border, scrollbar
            let cardBounds = e.currentTarget.getBoundingClientRect();
            let parentNode = e.currentTarget.ownerSVGElement;
            if (parentNode !== null) {

                const parentNodeBounds = parentNode.getBoundingClientRect();

                let placeToTop = cardBounds.top - parentNodeBounds.top;
                let width = cardBounds.width
                let height = cardBounds.height
                let placeToLeft = cardBounds.left - parentNodeBounds.left;
                //console.log("placeToTop",placeToTop,"width",width, "height", height, "placeToLeft", placeToLeft)
                dispatch(setActiveDragElement({
                    elementType: "card",
                    ID: element.cardID,
                    placeToTopY: placeToTop,
                    width: width,
                    height: height,
                    placeToLeftX: placeToLeft
                }))
            }


            //for local movement
            let newElement: DragElement;

            const bbox = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - bbox.left;
            const y = e.clientY - bbox.top;

            //console.log("element.x", element.x, "element.offsetX", element.offsetX, "x", x)
            newElement = {
                ...element,
                x: element.x - (element.offsetX - x),
                y: element.y - (element.offsetY - y),
            };

            setElement(newElement);
        }
    }

    function handlePointerUp(e: React.PointerEvent<SVGElement>) {
        let newElement: DragElement;
        //   console.log("element: ", element)

        newElement = { ...element, active: false, offsetX: -1, offsetY: -1 };

        setElement(newElement);

        props.saveCard({
            ...props.card,
            x: element.x,
            y: element.y
        })
    }

    return (
        <>

            <g
                key={element.cardID.toString()}
            >
                <rect
                    x={element.x}
                    y={element.y}
                    fill="#555555"
                    stroke="white"
                    rx="10"
                    width={element.width + 30}
                    height={element.height + 30}
                    onPointerDown={(event) => handlePointerDown(event)}
                    onPointerUp={(event) => handlePointerUp(event)}
                    onPointerMove={(event) => handlePointerMove(event)}
                    id={element.cardID.toString()}

                />
                <rect
                    x={element.x + 15}
                    y={element.y + 15}
                    width={element.width}
                    height={element.height}
                    fill="white"
                    rx="6"
                    id={element.cardID.toString()}
                />
            </g>

        </>
    );


}