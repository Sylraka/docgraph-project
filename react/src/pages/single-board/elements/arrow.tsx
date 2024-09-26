//dragNdrop svg: https://gist.github.com/hashrock/0e8f10d9a233127c5e33b09ca6883ff4

import React, { useState, useEffect } from 'react';

import { Card, Arrow } from '../../../app/fetch-data/dataTypes';
import "./arrow.css";
import SvgArrowHead from "./arrowHead"
import ArrowFocus from "./arrowFocus"

//we need that to read the state
import { useAppDispatch, useAppSelector } from '../../../app/hooks'; // path to custom Hook
import { setActiveDragElement, removeActiveDrag } from "./dragSlice"
import { setFocusElement, FocusState } from "./focusSlice"
import { setArrowInside } from "../singleBoardSlice"


interface canvasProps {
    arrow: Arrow;
    saveArrow: (param: Arrow) => void
}

interface anchorCanvas {
    x: number,
    y: number,

}

export interface DragElement extends Arrow {
    active: boolean,
    movedLeftX: number,
    movedTopY: number,
}


export default function ArrowComponent(props: canvasProps) {
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
        let rotation = computeRotation(element.anchorStart.anchorCanvas, element.anchorEnd.anchorCanvas)
        ///console.log("rotation",rotation)
        //update arrow if card moves || update arrow if anchor moves
        if ((activeDragValue.ID === element.anchorStart.onCard && activeDragValue.elementType === "card") || (activeFocusValue.ID === element.arrowID && activeDragValue.elementType === "arrowAnchorStart")) {
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
                        anchorCanvas: {
                            ...prevArrow.anchorStart.anchorCanvas,
                            x: xOnCard,
                            y: yOnCard
                        }
                    }
                }))

                //update arrow if anchor moves
            } else if (activeDragValue.elementType === "arrowAnchorStart") {

                setElement((prevArrow) => ({
                    ...prevArrow,
                    anchorStart: {
                        ...prevArrow.anchorStart,
                        onCard: overCardState.cardID,
                        anchorCanvas: {
                            ...prevArrow.anchorStart.anchorCanvas,
                            x: activeDragValue.placeToLeftX,
                            y: activeDragValue.placeToTopY,
                        }
                    }
                }))

            }
            //always save, overCardState is written in arrowFocus
            props.saveArrow({
                ...props.arrow,
                anchorStart: {
                    ...props.arrow.anchorStart,
                    anchorCanvas: {
                        ...props.arrow.anchorStart.anchorCanvas,
                        x: xOnCard,
                        y: yOnCard
                    }
                },
            })
        }
        //update arrow if card moves || update arrow if anchor moves
        if ((activeDragValue.ID === element.anchorEnd.onCard && activeDragValue.elementType === "card") || (activeFocusValue.ID === element.arrowID && activeDragValue.elementType === "arrowAnchorEnd")) {
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
                        anchorCanvas: {
                            ...prevArrow.anchorEnd.anchorCanvas,
                            x: xOnCard,
                            y: yOnCard
                        }
                    }
                }))
                //update arrow if anchor moves
            } else if (activeDragValue.elementType === "arrowAnchorEnd") {
                setElement((prevArrow) => ({
                    ...prevArrow,
                    anchorEnd: {
                        ...prevArrow.anchorEnd,
                        onCard: overCardState.cardID,
                        anchorCanvas: {
                            ...prevArrow.anchorEnd.anchorCanvas,
                            x: activeDragValue.placeToLeftX,
                            y: activeDragValue.placeToTopY,
                        }
                    }
                }))
            }
            //always save, overCardState is written in arrowFocus
            props.saveArrow({
                ...props.arrow,
                anchorEnd: {
                    ...props.arrow.anchorEnd,
                    anchorCanvas: {
                        ...props.arrow.anchorEnd.anchorCanvas,
                        x: xOnCard,
                        y: yOnCard
                    }

                }
            })
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
        dispatch(setFocusElement({ elementType: "arrow", ID: props.arrow.arrowID }))
        let newElement: DragElement;
       
    }




    return (
        <>

            <g
                key={"arrowGroupID" + element.arrowID}

            >
                <line
                    x1={element.anchorStart.anchorCanvas.x}
                    y1={element.anchorStart.anchorCanvas.y}
                    x2={element.anchorEnd.anchorCanvas.x}
                    y2={element.anchorEnd.anchorCanvas.y}
                    stroke="#006666"
                    strokeWidth={3}
                    onPointerDown={(event) => handlePointerDown(event)}
                  //  onPointerUp={(event) => handlePointerUp(event)}
                  //  onPointerMove={(event) => handlePointerMove(event)}
                    id={"lineID" + element.arrowID}
                />

                <SvgArrowHead
                    arrow={element}
                    computeRotation={computeRotation}
                />





            </g>

        </>
    );
}