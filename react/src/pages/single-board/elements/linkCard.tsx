//draggable https://www.npmjs.com/package/react-draggable#react-draggable
import { useState, useRef, useEffect } from "react";
import { LinkCard } from '../../../app/fetch-data/dataTypes';
import './card.css';

import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';

import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { setActiveDragElement, removeActiveDrag, DragState } from "../../slices/dragSlice"
import { setFocusElement } from "../../slices/focusSlice"
import { removeOverCard, setOverCard } from "../../slices/overCardSlice"
import { setLinkCardInside } from "../../../app/fetch-data/singleBoardSlice";

import CardFocus from "./cardFocus"
import { Link } from "react-router-dom";


interface canvasProps {
    card: LinkCard,
    boardId: string,
}


//the attributes we need to drag plus the card attributes
interface DragElement extends LinkCard {
    active: boolean;
    offsetX: number;
    offsetY: number;
}

export default function LinkCardComponent(props: canvasProps) {
    const overCardState = useAppSelector(state => state.overCard);
    const dispatch = useAppDispatch()

    const [element, setElement] = useState<DragElement>({
        // the attributes the cards didnt have
        ...props.card,
        active: false,
        offsetX: -1, //place between element left and mouse
        offsetY: -1, // place between element top and mouse   

    });







    function handlePointerDown(e: React.PointerEvent<SVGElement>) {
        dispatch(setFocusElement({ elementType: "card", ID: props.card.fromArrowID }))
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
                    ID: element.fromArrowID,
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
                linkPosition: {
                    x: element.linkPosition.x - (element.offsetX - x),
                    y: element.linkPosition.y - (element.offsetY - y),
                }
            };

            setElement(newElement);
        }
    }

    function handlePointerUp(e: React.PointerEvent<SVGElement>) {
        let newElement: DragElement;
        //   console.log("element: ", element)

        newElement = { ...element, active: false, offsetX: -1, offsetY: -1 };

        setElement(newElement);

        setLinkCardInside({
            ...props.card,
            linkPosition: {
                x: element.linkPosition.x,
                y: element.linkPosition.y
            }
        })

    }

    return (
        <>

            <g
                key={element.fromArrowID}
            >

                {(overCardState.cardID === element.fromArrowID.toString()) &&
                    <rect
                        x={element.linkPosition.x}
                        y={element.linkPosition.y}
                        fill="#555555"
                        stroke="#3399ff"
                        strokeWidth={5}
                        rx="10"
                        width={300}
                        height={100}
                        onPointerDown={(event) => handlePointerDown(event)}
                        onPointerUp={(event) => handlePointerUp(event)}
                        onPointerMove={(event) => handlePointerMove(event)}
                        id={element.fromArrowID.toString()}

                    />
                }
                {(overCardState.cardID !== element.fromArrowID.toString()) &&
                    <rect
                        x={element.linkPosition.x}
                        y={element.linkPosition.y}
                        fill="#555555"
                        stroke="white"
                        rx="10"
                        width={300}
                        height={100}
                        onPointerDown={(event) => handlePointerDown(event)}
                        onPointerUp={(event) => handlePointerUp(event)}
                        onPointerMove={(event) => handlePointerMove(event)}
                        id={element.fromArrowID.toString()}

                    />
                }



            </g>

        </>
    );


}