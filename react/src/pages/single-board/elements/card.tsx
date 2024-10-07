//draggable https://www.npmjs.com/package/react-draggable#react-draggable
import { useState, useRef, useEffect } from "react";
import { Card } from '../../../app/fetch-data/dataTypes';
import './card.css';

import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';

import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { setActiveDragElement, removeActiveDrag, DragState } from "../../slices/dragSlice"
import { setFocusElement } from "../../slices/focusSlice"
import { setOverCard } from "../../slices/overCardSlice"

import CardFocus from "./cardFocus"

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
    const activeDragValue = useAppSelector(state => state.drag)

    const [element, setElement] = useState<DragElement>({
        // the attributes the cards didnt have
        ...props.card,
        active: false,
        offsetX: -1, //place between element left and mouse
        offsetY: -1, // place between element top and mouse   

    });


//update width and height of a card (cardFocus is moving)
    useEffect(() => {
        if (activeDragValue.elementType === "cardAnchorBottomRight" && activeDragValue.ID == element.cardID.toString()) {
            setElement(prevElement => ({
                ...prevElement,
                width: Math.max(prevElement.width + activeDragValue.width,30),
                height: Math.max(prevElement.height + activeDragValue.height,30)
            }))
            props.saveCard({
                ...props.card,
                width: Math.max(props.card.width + activeDragValue.width, 30),
                height:  Math.max(props.card.height + activeDragValue.height,30)
            })     
        } else if (activeDragValue.elementType === "cardAnchorBottomLeft" && activeDragValue.ID == element.cardID.toString()) {
            setElement(prevElement => ({
                ...prevElement,
                x:  prevElement.x + activeDragValue.width,
                width: Math.max(prevElement.width - activeDragValue.width, 30),
                height: Math.max(prevElement.height + activeDragValue.height,30)
            }))
            props.saveCard({
                ...props.card,
                x:  props.card.x + activeDragValue.width,
                width: Math.max(props.card.width - activeDragValue.width, 30),
                height:  Math.max(props.card.height + activeDragValue.height,30)
            })  
        }else if (activeDragValue.elementType === "cardAnchorTopRight" && activeDragValue.ID == element.cardID.toString()) {
            setElement(prevElement => ({
                ...prevElement,
                y:  prevElement.y + activeDragValue.height,
                width: Math.max(prevElement.width + activeDragValue.width, 30),
                height: Math.max(prevElement.height - activeDragValue.height,30)
            }))
            props.saveCard({
                ...props.card,
                y:  props.card.x + activeDragValue.height,
                width: Math.max(props.card.width + activeDragValue.width, 30),
                height:  Math.max(props.card.height - activeDragValue.height,30)
            })  
        }else if (activeDragValue.elementType === "cardAnchorTopLeft" && activeDragValue.ID == element.cardID.toString()) {
            setElement(prevElement => ({
                ...prevElement,
                y:  prevElement.y + activeDragValue.height,
                x:  prevElement.x + activeDragValue.width,
                width: Math.max(prevElement.width - activeDragValue.width, 30),
                height: Math.max(prevElement.height - activeDragValue.height,30)
            }))
            props.saveCard({
                ...props.card,
                x:  props.card.x + activeDragValue.width,
                y:  props.card.x + activeDragValue.height,
                width: Math.max(props.card.width - activeDragValue.width, 30),
                height:  Math.max(props.card.height - activeDragValue.height,30)
            })  
        }



    }, [activeDragValue]);





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
                    ID: element.cardID.toString(),
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