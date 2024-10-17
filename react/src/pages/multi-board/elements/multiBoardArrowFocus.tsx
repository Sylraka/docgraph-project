import { useState, useEffect } from "react";

import { multiBoardArrow } from '../../../app/fetch-data/dataTypes';
import "../../single-board/elements/arrow.css";

//we need that to read the state
import { useAppDispatch, useAppSelector } from '../../../app/hooks'; // path to custom Hook
import { setActiveDragElement, removeActiveDrag, DragState } from "../../slices/dragSlice"
import overCardSlice, { setOverCard, removeOverCard } from "../../slices/overCardSlice"


import { setArrowInside } from "../../../app/fetch-data/multiBoardArrowSlice"


type propTypes = {
    arrow: multiBoardArrow,
};
interface DragElement extends multiBoardArrow {
    active: boolean;
    offsetX: number;
    offsetY: number;
}



export const ArrowFocus = (props: propTypes) => {
    const overCardState = useAppSelector((state) => state.overCard)
    const dispatch = useAppDispatch()

    const [element, setElement] = useState<DragElement>({
        // the attributes the cards didnt have
        ...props.arrow,
        active: false,
        offsetX: -1, //place between element left and mouse
        offsetY: -1, // place between element top and mouse

    });







    const handlePointerDown = (event: React.PointerEvent<SVGElement>, location: string) => {
        let anchor: any;
        if (location === "Start") {
            anchor = props.arrow.anchorStart
        } else {
            anchor = props.arrow.anchorEnd
        }

        const el = event.currentTarget;
        let bounds = event.currentTarget.getBoundingClientRect();

        const x = event.clientX - bounds.left;
        const y = event.clientY - bounds.top;

        //console.log("clientX:", event.clientX , "bounds:", bounds.left)

        //element "fängt" den pointer ein, selbst wenn die maus außerhalb des elements liegt, erhält es weiter pointerevents
        // wie pointermove, pointerup, bis zeiger losgelkassen wird
        el.setPointerCapture(event.pointerId);

        // dispatch(setActiveDragElement(newElement))
        let newElement = { ...props.arrow, offsetX: x, offsetY: y, active: true };
        setElement(newElement)

    }




    const handlePointerMove = (event: React.PointerEvent<SVGElement>, location: string) => {
        if (element.active === true) {

            // manually pointer-enter-event over a little offset in all four corners, tracks overCardStatus
            let ellipseElement;
            const elementUnderPointer1 = document.elementFromPoint(event.clientX + 10, event.clientY + 10);
            const elementUnderPointer2 = document.elementFromPoint(event.clientX - 10, event.clientY + 10);
            const elementUnderPointer3 = document.elementFromPoint(event.clientX + 10, event.clientY - 10);
            const elementUnderPointer4 = document.elementFromPoint(event.clientX - 10, event.clientY - 10);

            if (elementUnderPointer1 && elementUnderPointer1.tagName === 'ellipse') {
                ellipseElement = elementUnderPointer1
            } else if (elementUnderPointer2 && elementUnderPointer2.tagName === 'ellipse') {
                ellipseElement = elementUnderPointer2
            } else if (elementUnderPointer3 && elementUnderPointer3.tagName === 'ellipse') {
                ellipseElement = elementUnderPointer3
            } else if (elementUnderPointer4 && elementUnderPointer4.tagName === 'ellipse') {
                ellipseElement = elementUnderPointer4
            } else {
                ellipseElement = undefined
            }

            let id: String;
            if (ellipseElement !== undefined) {
                id = ellipseElement.id;
                console.log('Pointer entered ellipse nr', id);
                dispatch(setOverCard(id))
            } else {
                dispatch(removeOverCard())
                // console.log('pointer is free')
                console.log("arrowID:", element._id)
            }


            let bounds = event.currentTarget.getBoundingClientRect();
            //for local movement
            const x = event.clientX - bounds.left;
            const y = event.clientY - bounds.top;

            let newElement: DragElement;
            let newDragElement: DragState;

            if (location === "Start") {
                //for updating the arrow, he is listening to dragState
                newDragElement = {
                    elementType: "arrowAnchor" + location,
                    ID: "dragStart" + props.arrow._id!,
                    placeToLeftX: element.anchorStart.x,
                    placeToTopY: element.anchorStart.y,
                    width: 0,
                    height: 0,
                };

                //for updating the anchor
                newElement = {
                    ...element,
                    anchorStart: {
                        ...element.anchorStart,
                        ...element.anchorStart,
                        x: element.anchorStart.x - (element.offsetX - x),
                        y: element.anchorStart.y - (element.offsetY - y),

                    }
                };

            } else {
                //for updating the arrow, he is listening to dragState
                newDragElement = {
                    elementType: "arrowAnchor" + location,
                    ID: "dragEnd" + props.arrow._id!,
                    placeToLeftX: element.anchorEnd.x,
                    placeToTopY: element.anchorEnd.y,
                    width: 0,
                    height: 0,
                };

                //for updating the anchor
                newElement = {
                    ...element,
                    anchorEnd: {
                        ...element.anchorEnd,
                        x: element.anchorEnd.x - (element.offsetX - x),
                        y: element.anchorEnd.y - (element.offsetY - y),
                    }
                }
            };


            dispatch(setActiveDragElement(newDragElement))
            setElement(newElement);

        }
    }




    const handlePointerUp = (event: React.PointerEvent<SVGElement>, location: string) => {
        let newElement: DragElement;
        newElement = { ...element, active: false, offsetX: -1, offsetY: -1 };
        setElement(newElement);


        console.log("overCardState", overCardState)


        if (location === "Start") {
            dispatch(setArrowInside({
                ...element,
                anchorStart: {
                    ...element.anchorStart,
                    onCard: overCardState.cardID.toString(),
                    x: element.anchorStart.x,
                    y: element.anchorStart.y,

                }
            }));
        } else {
            dispatch(setArrowInside({
                ...element,
                anchorEnd: {
                    ...element.anchorEnd,
                    onCard: overCardState.cardID.toString(),
                    x: element.anchorEnd.x,
                    y: element.anchorEnd.y,

                }
            }));

        }
        dispatch(removeOverCard())

    }




    return (
        <>
            <g
            >
                <circle
                    r="6"
                    cx={element.anchorStart.x}
                    cy={element.anchorStart.y}
                    fill='#3399ff'
                    stroke='white'
                    strokeWidth='1'
                    className='focusPoints'
                    onPointerDown={event => handlePointerDown(event, "Start")}
                    onPointerMove={event => handlePointerMove(event, "Start")}
                    onPointerUp={event => handlePointerUp(event, "Start")}
                >
                </circle>

                <circle
                    r="6"
                    cx={element.anchorEnd.x}
                    cy={element.anchorEnd.y}
                    fill='#3399ff'
                    stroke='white'
                    strokeWidth='1'
                    className='focusPoints'
                    onPointerDown={event => handlePointerDown(event, "End")}
                    onPointerMove={event => handlePointerMove(event, "End")}
                    onPointerUp={event => handlePointerUp(event, "End")}
                >

                </circle>




            </g>
        </>
    );
};

