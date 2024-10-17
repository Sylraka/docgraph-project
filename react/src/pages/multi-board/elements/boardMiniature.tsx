import { useState, useRef, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks"

import { Board } from '../../../app/fetch-data/dataTypes';
import { setBoard } from "../../../app/fetch-data/allBoardsSlice"

import { setActiveDragElement } from "../../slices/dragSlice"
import { setFocusElement } from "../../slices/focusSlice";

interface miniatureProps {
    board: Board,
}


interface DragElement extends Board {
    active: boolean;
    offsetX: number;
    offsetY: number;
}

export const BoardMiniature = (props: miniatureProps) => {
    const overCardState = useAppSelector(state => state.overCard);
    const dispatch = useAppDispatch()
    const [element, setElement] = useState<DragElement>({
        // the attributes the cards didnt have
        ...props.board,
        active: false,
        offsetX: -1, //place between element left and mouse
        offsetY: -1, // place between element top and mouse   

    });




    function handlePointerDown(e: React.PointerEvent<SVGElement>) {
        dispatch(setFocusElement({ elementType: "board", ID: props.board._id! }))
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
                    elementType: "board",
                    ID: element._id!,
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
                boardPosition: {
                    x: element.boardPosition.x - (element.offsetX - x),
                    y: element.boardPosition.y - (element.offsetY - y),
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
        dispatch(setBoard({
            ...props.board,
            boardPosition: {
                x: element.boardPosition.x,
                y: element.boardPosition.y
            }
        }))

    }

    return (<>

        <g
            key={props.board._id}
        >
            {(overCardState.cardID === element._id) &&
                <ellipse
                    cx={element.boardPosition.x}
                    cy={element.boardPosition.y}
                    fill="#555555"
                    stroke="#3399ff"
                    strokeWidth={5}
                    rx="100"
                    width={100 + 30}
                    height={30 + 30}
                    ry="50"
                    onPointerDown={(event) => handlePointerDown(event)}
                    onPointerUp={(event) => handlePointerUp(event)}
                    onPointerMove={(event) => handlePointerMove(event)}
                    id={element._id}

                />
            }
            {(overCardState.cardID !== element._id) &&
                <ellipse
                    cx={element.boardPosition.x}
                    cy={element.boardPosition.y}
                    fill="#555555"
                    stroke="white"
                    rx="100"
                    width={100 + 30}
                    height={30 + 30}
                    ry="50"
                    onPointerDown={(event) => handlePointerDown(event)}
                    onPointerUp={(event) => handlePointerUp(event)}
                    onPointerMove={(event) => handlePointerMove(event)}
                    id={element._id}

                />
            }
        </g>

    </>);
}