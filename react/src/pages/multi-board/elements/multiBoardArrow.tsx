//dragNdrop svg: https://gist.github.com/hashrock/0e8f10d9a233127c5e33b09ca6883ff4

import React, { useState, useEffect } from 'react';

import { Board, multiBoardArrow } from '../../../app/fetch-data/dataTypes';
import "../../single-board/elements/arrow.css";
//import SvgArrowHead from "./arrowHead"
//import ArrowFocus from "./arrowFocus"

//we need that to read the state
import { useAppDispatch, useAppSelector } from '../../../app/hooks'; // path to custom Hook
import { setActiveDragElement, removeActiveDrag } from "../../slices/dragSlice"
import { setFocusElement, FocusState } from "../../slices/focusSlice"
import { setArrowInside } from "../../../app/fetch-data/singleBoardSlice"

import { updateArrowsInDb, setBoard } from "../../../app/fetch-data/multiBoardArrowSlice"

interface canvasProps {
    arrow: multiBoardArrow;
}

interface anchorCanvas {
    onCard: String,
    boardRubrics: String[],
    x: number,
    y: number,
}

export interface DragElement extends multiBoardArrow {
    active: boolean,
    movedLeftX: number,
    movedTopY: number,
}


export function ArrowComponent(props: canvasProps) {
    const dispatch = useAppDispatch()
    let activeDragValue = useAppSelector((state) => state.drag)
    let activeFocusValue = useAppSelector((state) => state.focus)
    let overCardState = useAppSelector((state) => state.overCard)

    const [element, setElement] = useState<DragElement>({
        ...props.arrow,
        active: false,
        movedLeftX: -1, // Initialwert für xOffset
        movedTopY: -1, // Initialwert für yOffset

    });


    //every time the activeDragSlice triggers a card-movement, the arrows render again
    useEffect(() => {
        let xOnCard = 0;
        let yOnCard = 0;
        let rotation = computeRotation(element.anchorStart, element.anchorEnd)
        ///console.log("rotation",rotation)
        //update arrow if card moves || update arrow if anchor moves
        if ((activeDragValue.ID === element.anchorStart.onCard.toString() && activeDragValue.elementType === "card") || (activeFocusValue.ID.toString() === element._id && activeDragValue.elementType === "arrowAnchorStart")) {
            //update arrow if card moves
            if (activeDragValue.elementType === "card") {
                if (rotation >= 45 && rotation <= 135) {
                    xOnCard = activeDragValue.placeToLeftX
                    yOnCard = activeDragValue.placeToTopY + activeDragValue.height / 2
                } else if (rotation > 135 && rotation <= 225) {
                    xOnCard = activeDragValue.placeToLeftX + activeDragValue.width / 2
                    yOnCard = activeDragValue.placeToTopY
                } else if (rotation > 225 && rotation <= 315) {
                    xOnCard = activeDragValue.placeToLeftX + activeDragValue.width
                    yOnCard = activeDragValue.placeToTopY + activeDragValue.height / 2
                } else if (rotation > 315 && rotation <= 360 || rotation >= 0 && rotation < 45) {
                    xOnCard = activeDragValue.placeToLeftX + activeDragValue.width / 2
                    yOnCard = activeDragValue.placeToTopY + activeDragValue.height

                }

                setElement((prevArrow) => ({
                    ...prevArrow,
                    anchorStart: {
                        ...prevArrow.anchorStart,
                        x: xOnCard,
                        y: yOnCard

                    }
                }))

                //update arrow if anchor moves
            } else if (activeDragValue.elementType === "arrowAnchorStart") {

                setElement((prevArrow) => ({
                    ...prevArrow,
                    anchorStart: {
                        ...prevArrow.anchorStart,
                        onCard: overCardState.cardID.toString(),//TODO
                        x: activeDragValue.placeToLeftX,
                        y: activeDragValue.placeToTopY,
                    }
                }))

            }
            //always save, overCardState is written in arrowFocus
            dispatch(updateArrowsInDb({
                ...props.arrow,
                anchorStart: {
                    ...props.arrow.anchorStart,
                    x: xOnCard,
                    y: yOnCard
                },
            }))

        }
        //update arrow if card moves || update arrow if anchor moves
        if ((activeDragValue.ID === element.anchorEnd.onCard.toString() && activeDragValue.elementType === "card") || (activeFocusValue.ID.toString() === element._id && activeDragValue.elementType === "arrowAnchorEnd")) {
            //update arrow if card moves
            if (activeDragValue.elementType === "card") {
                if (rotation >= 45 && rotation <= 135) {
                    xOnCard = activeDragValue.placeToLeftX + activeDragValue.width + 10
                    yOnCard = activeDragValue.placeToTopY + activeDragValue.height / 2
                } else if (rotation > 135 && rotation <= 225) {
                    xOnCard = activeDragValue.placeToLeftX + activeDragValue.width / 2
                    yOnCard = activeDragValue.placeToTopY + activeDragValue.height + 10
                } else if (rotation > 225 && rotation <= 315) {
                    xOnCard = activeDragValue.placeToLeftX - 10
                    yOnCard = activeDragValue.placeToTopY + activeDragValue.height / 2
                } else if (rotation > 315 && rotation <= 360 || rotation >= 0 && rotation < 45) {
                    xOnCard = activeDragValue.placeToLeftX + activeDragValue.width / 2
                    yOnCard = activeDragValue.placeToTopY - 10
                }

                setElement((prevArrow) => ({
                    ...prevArrow,
                    anchorEnd: {
                        ...prevArrow.anchorEnd,
                        x: xOnCard,
                        y: yOnCard
                    }
                }))
                //update arrow if anchor moves
            } else if (activeDragValue.elementType === "arrowAnchorEnd") {
                setElement((prevArrow) => ({
                    ...prevArrow,
                    anchorEnd: {
                        ...prevArrow.anchorEnd,
                        onCard: overCardState.cardID.toString(),//TODO
                        x: activeDragValue.placeToLeftX,
                        y: activeDragValue.placeToTopY,

                    }
                }))
            }
            //always save, overCardState is written in arrowFocus
            dispatch(updateArrowsInDb({
                ...props.arrow,
                anchorEnd: {
                    ...props.arrow.anchorEnd,
                    x: xOnCard,
                    y: yOnCard
                },
            }))
        }

    }, [activeDragValue])


    // for the arrowHead
    // 360/0 at bottom, 90 at left, 180 top, 270 right 
    const computeRotation = (startPoint: anchorCanvas, endPoint: anchorCanvas) => {
        //positive== right side, negative==left side
        let differenceX = startPoint.x - endPoint.x;
        let differenceY = startPoint.y - endPoint.y;

        let rotation = Math.atan2(differenceX, differenceY); // range (-PI, PI]
        rotation *= -1 * (180 / Math.PI)  // rads to degs, range (-180, 180]
        rotation += 180;// range [0, 360)

        //  console.log(rotation)
        return (rotation);
    }






    // drags the hole arrow
    function handlePointerDown(e: React.PointerEvent<SVGElement>) {
        dispatch(setFocusElement({ elementType: "arrow", ID: props.arrow._id! }))
        let newElement: DragElement;

    }




    return (
        <>

            <g
                key={"arrowGroupID" + element._id}

            >
                <line
                    x1={element.anchorStart.x}
                    y1={element.anchorStart.y}
                    x2={element.anchorEnd.x}
                    y2={element.anchorEnd.y}
                    stroke="#006666"
                    strokeWidth={3}
                    onPointerDown={(event) => handlePointerDown(event)}
                    //  onPointerUp={(event) => handlePointerUp(event)}
                    //  onPointerMove={(event) => handlePointerMove(event)}
                    id={"lineID" + element._id}
                />

                {/* <SvgArrowHead
                    arrow={element}
                    computeRotation={computeRotation}
                /> */}





            </g>

        </>
    );
}