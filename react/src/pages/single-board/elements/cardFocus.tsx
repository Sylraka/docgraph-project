import { useState, useEffect } from "react";

import { Card } from '../../../app/fetch-data/dataTypes';
import "./card.css"

//we need that to read the state
import { useAppDispatch, useAppSelector } from '../../../app/hooks'; // path to custom Hook
import { setActiveDragElement, removeActiveDrag, DragState } from "../../slices/dragSlice"
import overCardSlice, { setOverCard, removeOverCard } from "../../slices/overCardSlice"

import { setArrowInside } from "../../../app/fetch-data/singleBoardSlice"
import { aC } from "vitest/dist/reporters-LqC_WI4d.js";


type propTypes = {
    card: Card,
    saveCard: (param: Card) => void,
    //handleWidthHeight:(newWidth: number, newHeight: number) => void
};

interface DragElement extends Card {
    active: boolean;
    offsetX: number;
    offsetY: number;
}



export const CardFocus = (props: propTypes) => {
    let activeDragValue = useAppSelector(state => state.drag)
    const dispatch = useAppDispatch()


    const [elementTopLeft, setElementTopLeft] = useState<DragElement>({
        // the attributes the cards didnt have
        ...props.card,
        active: false,
        offsetX: -1, //place between element left and mouse
        offsetY: -1, // place between element top and mouse   
    });
    const [elementTopRight, setElementTopRight] = useState<DragElement>({
        // the attributes the cards didnt have
        ...props.card,
        active: false,
        offsetX: -1, //place between element left and mouse
        offsetY: -1, // place between element top and mouse   
    });
    const [elementBottomLeft, setElementBottomLeft] = useState<DragElement>({
        // the attributes the cards didnt have
        ...props.card,
        active: false,
        offsetX: -1, //place between element left and mouse
        offsetY: -1, // place between element top and mouse   
    });
    const [elementBottomRight, setElementBottomRight] = useState<DragElement>({
        // the attributes the cards didnt have
        ...props.card,
        active: false,
        offsetX: -1, //place between element left and mouse
        offsetY: -1, // place between element top and mouse   
    });

    useEffect(() => {
        if (activeDragValue.elementType === "card") {
            setElementTopLeft(prevElement => ({
                ...prevElement,
                x: activeDragValue.placeToLeftX,
                y: activeDragValue.placeToTopY
            }))
            setElementTopRight(prevElement => ({
                ...prevElement,
                x: activeDragValue.placeToLeftX,
                y: activeDragValue.placeToTopY
            }))
            setElementBottomLeft(prevElement => ({
                ...prevElement,
                x: activeDragValue.placeToLeftX,
                y: activeDragValue.placeToTopY
            }))
            setElementBottomRight(prevElement => ({
                ...prevElement,
                x: activeDragValue.placeToLeftX,
                y: activeDragValue.placeToTopY
            }))
        }

    }, [activeDragValue])


    const handlePointerDown = (event: React.PointerEvent<SVGElement>, location: string) => {
        let newElement: DragElement
        const el = event.currentTarget;
        const bounds = event.currentTarget.getBoundingClientRect();
        const x = event.clientX - bounds.left;
        const y = event.clientY - bounds.top;
        el.setPointerCapture(event.pointerId);
        if (location === "TopLeft") {
            newElement = { ...elementTopLeft, offsetX: x, offsetY: y, active: true };
            setElementTopLeft(newElement);
        } else if (location === "TopRight") {
            newElement = { ...elementTopRight, offsetX: x, offsetY: y, active: true };
            setElementTopRight(newElement);
        } else if (location === "BottomLeft") {
            newElement = { ...elementBottomLeft, offsetX: x, offsetY: y, active: true };
            setElementBottomLeft(newElement);
        } else if (location === "BottomRight") {
            newElement = { ...elementBottomRight, offsetX: x, offsetY: y, active: true };
            setElementBottomRight(newElement);
        }
    }


    const handlePointerMove = (event: React.PointerEvent<SVGElement>, location: string) => {
        let newTopLeft: DragElement
        let newTopRight: DragElement
        let newBottomLeft: DragElement
        let newBottomRight: DragElement

        if (elementTopLeft.active === true) {

            const bounds = event.currentTarget.getBoundingClientRect();
            const x = event.clientX - bounds.left;
            const y = event.clientY - bounds.top;

            newTopLeft = {
                ...elementTopLeft,
                x: elementTopLeft.x - (elementTopLeft.offsetX - x),
                y: elementTopLeft.y - (elementTopLeft.offsetY - y),
            };
            setElementTopLeft(newTopLeft);
            newTopRight = {
                ...elementTopRight,
                y: elementTopLeft.y - (elementTopLeft.offsetY - y)
            }
            setElementTopRight(newTopRight)
            newBottomLeft = {
                ...elementBottomLeft,
                x: elementTopLeft.x - (elementTopLeft.offsetX - x)
            }
            setElementBottomLeft(newBottomLeft)
            dispatch(setActiveDragElement({
                elementType: "cardAnchor" + location,
                ID: props.card.cardID.toString(),
                placeToLeftX: elementTopLeft.x,
                placeToTopY: elementTopLeft.y,
                width: x - elementTopLeft.offsetX,
                height: y - elementTopLeft.offsetY,
            }))


        } else if (elementTopRight.active === true) {

            const bounds = event.currentTarget.getBoundingClientRect();
            const x = event.clientX - bounds.left;
            const y = event.clientY - bounds.top;

            newTopRight = {
                ...elementTopRight,
                x: elementTopRight.x - (elementTopRight.offsetX - x),
                y: elementTopRight.y - (elementTopRight.offsetY - y),
            };
            setElementTopRight(newTopRight);
            newTopLeft = {
                ...elementTopLeft,
                y: elementTopRight.y - (elementTopRight.offsetY - y)
            }
            setElementTopLeft(newTopLeft)
            newBottomRight = {
                ...elementBottomRight,
                x: elementTopRight.x - (elementTopRight.offsetX - x)
            }
            setElementBottomRight(newBottomRight)
            dispatch(setActiveDragElement({
                elementType: "cardAnchor" + location,
                ID: props.card.cardID.toString(),
                placeToLeftX: elementTopRight.x,
                placeToTopY: elementTopRight.y,
                width: x - elementTopRight.offsetX,
                height: y - elementTopRight.offsetY,
            }))


        } else if (elementBottomLeft.active === true) {

            const bounds = event.currentTarget.getBoundingClientRect();
            const x = event.clientX - bounds.left;
            const y = event.clientY - bounds.top;

            newBottomLeft = {
                ...elementBottomLeft,
                x: elementBottomLeft.x - (elementBottomLeft.offsetX - x),
                y: elementBottomLeft.y - (elementBottomLeft.offsetY - y),
            };
            setElementBottomLeft(newBottomLeft);
            newTopLeft = {
                ...elementTopLeft,
                x: elementBottomLeft.x - (elementBottomLeft.offsetX - x)
            }
            setElementTopLeft(newTopLeft)
            newBottomRight = {
                ...elementBottomRight,
                y: elementBottomLeft.y - (elementBottomLeft.offsetY - y)
            }
            setElementBottomRight(newBottomRight)
            dispatch(setActiveDragElement({
                elementType: "cardAnchor" + location,
                ID: props.card.cardID.toString(),
                placeToLeftX: elementBottomLeft.x,
                placeToTopY: elementBottomLeft.y,
                width: x - elementBottomLeft.offsetX,
                height: y - elementBottomLeft.offsetY,
            }))


        } else if (elementBottomRight.active === true) {

            const bounds = event.currentTarget.getBoundingClientRect();
            const x = event.clientX - bounds.left;
            const y = event.clientY - bounds.top;

            newBottomRight = {
                ...elementBottomRight,
                x: elementBottomRight.x - (elementBottomRight.offsetX - x),
                y: elementBottomRight.y - (elementBottomRight.offsetY - y),
            };
            setElementBottomRight(newBottomRight);
            newTopRight = {
                ...elementTopRight,
                x: elementBottomRight.x - (elementBottomRight.offsetX - x)
            }
            setElementTopRight(newTopRight)
            newBottomLeft = {
                ...elementBottomLeft,
                y: elementBottomRight.y - (elementBottomRight.offsetY - y)
            }
            setElementBottomLeft(newBottomLeft)
            //console.log("bounds",bounds, "parentnodebounds", parentNodeBounds)
            // props.handleWidthHeight(x-elementBottomRight.offsetX, y-elementBottomRight.offsetY )
            dispatch(setActiveDragElement({
                elementType: "cardAnchor" + location,
                ID: props.card.cardID.toString(),
                placeToLeftX: elementBottomRight.x,
                placeToTopY: elementBottomRight.y,
                width: x - elementBottomRight.offsetX,
                height: y - elementBottomRight.offsetY,
            }))

        }

    }


    const handlePointerUp = (event: React.PointerEvent<SVGElement>, location: string) => {
        let newElement: DragElement;

        if (location === "TopLeft") {
            newElement = { ...elementTopLeft, active: false, offsetX: -1, offsetY: -1 };
            setElementTopLeft(newElement);
        } else if (location === "TopRight") {
            newElement = { ...elementTopRight, active: false, offsetX: -1, offsetY: -1 };
            setElementTopRight(newElement);
        } else if (location === "BottomLeft") {
            newElement = { ...elementBottomLeft, active: false, offsetX: -1, offsetY: -1 };
            setElementBottomLeft(newElement);
        } else if (location === "BottomRight") {
            newElement = { ...elementBottomRight, active: false, offsetX: -1, offsetY: -1 };
            setElementBottomRight(newElement);
        }

        // props.saveCard({
        //     ...props.card,
        //     // x: element2.x,
        //     // y: element2.y
        // })

    }


    return (
        <>
            <g
            >
                <circle
                    r="6"
                    cx={elementTopLeft.x}
                    cy={elementTopLeft.y}
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
                    cx={elementTopRight.x + elementTopRight.width + 30}
                    cy={elementTopRight.y}
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
                    cx={elementBottomLeft.x}
                    cy={elementBottomLeft.y + elementBottomLeft.height + 30}
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
                    cx={elementBottomRight.x + elementBottomRight.width + 30}
                    cy={elementBottomRight.y + elementBottomRight.height + 30}
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
