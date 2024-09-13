import { useState, useEffect } from "react";

import { Arrow } from '../../../app/fetch-data/apiSlice';
import "./arrow.css"

//we need that to read the state
import { useAppDispatch, useAppSelector } from '../../../app/hooks'; // path to custom Hook
import { setActiveDragElement, removeActiveDrag, DragState } from "./dragSlice"
import overCardSlice, { setOverCard, removeOverCard } from "./overCardSlice"

type propTypes = {
    arrow: Arrow,
    saveArrow: (param: Arrow) => void
};
interface DragElement extends Arrow {
    active: boolean;
    offsetX: number;
    offsetY: number;
}



//TODO make arrowhead as marker-element: https://developer.mozilla.org/en-US/docs/Web/SVG/Element/marker
const ArrowFocus = (props: propTypes) => {
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
            let rectElement;
            const elementUnderPointer1 = document.elementFromPoint(event.clientX + 10, event.clientY + 10);
            const elementUnderPointer2 = document.elementFromPoint(event.clientX - 10, event.clientY + 10);
            const elementUnderPointer3 = document.elementFromPoint(event.clientX + 10, event.clientY - 10);
            const elementUnderPointer4 = document.elementFromPoint(event.clientX - 10, event.clientY - 10);

            if (elementUnderPointer1 && elementUnderPointer1.tagName === 'rect') {
                rectElement = elementUnderPointer1
            } else if (elementUnderPointer2 && elementUnderPointer2.tagName === 'rect') {
                rectElement = elementUnderPointer2
            } else if (elementUnderPointer3 && elementUnderPointer3.tagName === 'rect') {
                rectElement = elementUnderPointer3
            } else if (elementUnderPointer4 && elementUnderPointer4.tagName === 'rect') {
                rectElement = elementUnderPointer4
            } else {
                rectElement = undefined
            }

            let id: number;
            if (rectElement !== undefined) {
                id = Number(rectElement.id);
                console.log('Pointer entered rectangle nr', id);
                dispatch(setOverCard(id))
            } else {
                dispatch(removeOverCard())
                console.log('pointer is free')
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
                    ID: props.arrow.anchorStart.anchorID,
                    placeToLeftX: element.anchorStart.anchorCanvas.x,
                    placeToTopY: element.anchorStart.anchorCanvas.y,
                    width: 0,
                    height: 0,
                };

                //for updating the anchor
                newElement = {
                    ...element,
                    anchorStart: {
                        ...element.anchorStart,
                        anchorCanvas: {
                            ...element.anchorStart.anchorCanvas,
                            x: element.anchorStart.anchorCanvas.x - (element.offsetX - x),
                            y: element.anchorStart.anchorCanvas.y - (element.offsetY - y),
                        }
                    }
                };

            } else {
                //for updating the arrow, he is listening to dragState
                newDragElement = {
                    elementType: "arrowAnchor" + location,
                    ID: props.arrow.anchorEnd.anchorID,
                    placeToLeftX: element.anchorEnd.anchorCanvas.x,
                    placeToTopY: element.anchorEnd.anchorCanvas.y,
                    width: 0,
                    height: 0,
                };

                //for updating the anchor
                newElement = {
                    ...element,
                    anchorEnd: {
                        ...element.anchorEnd,
                        anchorCanvas: {
                            ...element.anchorEnd.anchorCanvas,
                            x: element.anchorEnd.anchorCanvas.x - (element.offsetX - x),
                            y: element.anchorEnd.anchorCanvas.y - (element.offsetY - y),
                        }
                    }
                };
            }

            dispatch(setActiveDragElement(newDragElement))
            setElement(newElement);
        }
    }




    const handlePointerUp = (event: React.PointerEvent<SVGElement>, location: string) => {
        let newElement: DragElement;
        newElement = { ...element, active: false, offsetX: -1, offsetY: -1 };
        setElement(newElement);


        console.log("overCardState",overCardState)


        if (location === "Start") {
            props.saveArrow({
                ...element,
                anchorStart: {
                    ...element.anchorStart,
                    onCard: overCardState.cardID,
                    anchorCanvas: {
                        ...element.anchorStart.anchorCanvas,
                        x: element.anchorStart.anchorCanvas.x,
                        y: element.anchorStart.anchorCanvas.y,
                    }
                }
            });
        } else {
            props.saveArrow({
                ...element,
                anchorEnd: {
                    ...element.anchorEnd,
                    onCard: overCardState.cardID,
                    anchorCanvas: {
                        ...element.anchorEnd.anchorCanvas,
                        x: element.anchorEnd.anchorCanvas.x,
                        y: element.anchorEnd.anchorCanvas.y,
                    }
                }
            });
        }


    }




    return (
        <>
            <g
            >
                <circle
                    r="6"
                    cx={element.anchorStart.anchorCanvas.x}
                    cy={element.anchorStart.anchorCanvas.y}
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
                    cx={element.anchorEnd.anchorCanvas.x}
                    cy={element.anchorEnd.anchorCanvas.y}
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

export default ArrowFocus;
