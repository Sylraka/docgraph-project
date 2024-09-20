import { useState, useEffect } from "react";

import { Card } from '../../../app/fetch-data/dataTypes';
import "./card.css"

//we need that to read the state
import { useAppDispatch, useAppSelector } from '../../../app/hooks'; // path to custom Hook
import { setActiveDragElement, removeActiveDrag, DragState } from "./dragSlice"
import overCardSlice, { setOverCard, removeOverCard } from "./overCardSlice"

import { setArrowInside } from "../singleBoardSlice"
import { aC } from "vitest/dist/reporters-LqC_WI4d.js";


type propTypes = {
    card: Card,
    saveCard: (param: Card) => void,
};

interface DragElement extends Card {
    active: boolean;
    offsetX: number;
    offsetY: number;
}



export const CardFocus = (props: propTypes) => {
    let activeDragValue = useAppSelector(state => state.drag)

    const [element, setElement] = useState<DragElement>({
        // the attributes the cards didnt have
        ...props.card,
        active: false,
        offsetX: -1, //place between element left and mouse
        offsetY: -1, // place between element top and mouse   

    });

    useEffect(() => {
        if (activeDragValue.elementType === "card") {
            setElement(prevElement => ({
                ...prevElement,
                x: activeDragValue.placeToLeftX,
                y: activeDragValue.placeToTopY
            }))
        }

    }, [activeDragValue])


    const handlePointerDown = (event: React.PointerEvent<SVGElement>, location: string) => {
        let newElement: DragElement
        const el = event.currentTarget;
        const bbox = event.currentTarget.getBoundingClientRect();
        const x = event.clientX - bbox.left;
        const y = event.clientY - bbox.top;
        el.setPointerCapture(event.pointerId);
        newElement = { ...element, offsetX: x, offsetY: y, active: true };
        setElement(newElement);

    }


    const handlePointerMove = (event: React.PointerEvent<SVGElement>, location: string) => {
        if (element.active === true) {


            //for local movement
            let newElement: DragElement;

            const bounds = event.currentTarget.getBoundingClientRect();
            const x = event.clientX - bounds.left;
            const y = event.clientY - bounds.top;

            //console.log("element2.x", element2.x, "element2.offsetX", element2.offsetX, "x", x)
            newElement = {
                ...element,
                x: element.x - (element.offsetX - x),
                y: element.y - (element.offsetY - y),
            };
            // props.setElement({
            //     ...props.element,
            //     width: 
            // })
            setElement(newElement);
        }

    }


    const handlePointerUp = (event: React.PointerEvent<SVGElement>, location: string) => {
        let newElement: DragElement;

        newElement = { ...element, active: false, offsetX: -1, offsetY: -1 };

        setElement(newElement);

        props.saveCard({
            ...props.card,
            // x: element2.x,
            // y: element2.y
        })

    }


    return (
        <>
            <g
            >
                <circle
                    r="6"
                    cx={element.x}
                    cy={element.y}
                    fill='#3399ff'
                    stroke='white'
                    strokeWidth='1'
                    className='focusPoints'
                    onPointerDown={event => handlePointerDown(event, "TopLeft")}
                    onPointerMove={event => handlePointerMove(event, "TopLeft")}
                    onPointerUp={event => handlePointerUp(event, "TopLeft")}
                >
                </circle>
                <circle
                    r="6"
                    cx={element.x + element.width + 30}
                    cy={element.y}
                    fill='#3399ff'
                    stroke='white'
                    strokeWidth='1'
                    className='focusPoints'
                    onPointerDown={event => handlePointerDown(event, "TopRight")}
                    onPointerMove={event => handlePointerMove(event, "TopRight")}
                    onPointerUp={event => handlePointerUp(event, "TopRight")}
                >
                </circle>
                <circle
                    r="6"
                    cx={element.x}
                    cy={element.y + element.height + 30}
                    fill='#3399ff'
                    stroke='white'
                    strokeWidth='1'
                    className='focusPoints'
                    onPointerDown={event => handlePointerDown(event, "BottomLeft")}
                    onPointerMove={event => handlePointerMove(event, "BottomLeft")}
                    onPointerUp={event => handlePointerUp(event, "BottomLeft")}
                >
                </circle>
                <circle
                    r="6"
                    cx={element.x + element.width + 30}
                    cy={element.y + element.height + 30}
                    fill='#3399ff'
                    stroke='white'
                    strokeWidth='1'
                    className='focusPoints'
                    onPointerDown={event => handlePointerDown(event, "BottomRight")}
                    onPointerMove={event => handlePointerMove(event, "BottomRight")}
                    onPointerUp={event => handlePointerUp(event, "BottomRight")}
                >
                </circle>



            </g>
        </>
    );
};

export default CardFocus;
