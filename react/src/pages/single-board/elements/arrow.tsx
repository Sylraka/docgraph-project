//dragNdrop svg: https://gist.github.com/hashrock/0e8f10d9a233127c5e33b09ca6883ff4

import React, { useState, useEffect } from 'react';

import { Card, Arrow } from '../../../app/fetch-data/apiSlice';
import "./arrow.css";
import SvgArrowHead from "./arrowHead"
import ArrowFocus from "./arrowFocus"

//we need that to read the state
import { useAppDispatch, useAppSelector } from '../../../app/hooks'; // path to custom Hook
import { setActiveDragElement, removeActiveDrag } from "./dragSlice"
import { setFocusElement, FocusState } from "./focusSlice"


interface canvasProps {
    arrow: Arrow;
    saveArrow: (param: Arrow) => void
}

interface anchorCanvas {
    canvasNumber: number;
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

        if ((activeDragValue.ID === element.anchorStart.onCard && activeDragValue.elementType === "card") || (activeFocusValue.ID === element.arrowID && activeDragValue.elementType === "arrowAnchorStart")) {
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
            } else if (rotation > 315 && rotation <= 360 && rotation >= 0 && rotation < 45) {
                xOnCard = activeDragValue.placeToLeftX + activeDragValue.width / 2
                yOnCard = activeDragValue.placeToTopY + activeDragValue.height

            }


            //point-operator is not allowed in typescript
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
        }else if(activeDragValue.elementType === "arrowAnchorStart"){

            setElement((prevArrow) => ({
                ...prevArrow,
                anchorStart: {
                    ...prevArrow.anchorStart,
                    anchorCanvas: {
                        ...prevArrow.anchorStart.anchorCanvas,
                        x:  activeDragValue.placeToLeftX,
                        y:  activeDragValue.placeToTopY,
                    }
                }
            }))

        }

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

        if ((activeDragValue.ID === element.anchorEnd.onCard && activeDragValue.elementType === "card") || (activeFocusValue.ID === element.arrowID && activeDragValue.elementType === "arrowAnchorEnd")) {
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
                } else if (rotation > 315 && rotation <= 360 && rotation >= 0 && rotation < 45) {
                    xOnCard = activeDragValue.placeToLeftX + activeDragValue.width / 2
                    yOnCard = activeDragValue.placeToTopY - 10
                }

                //point-operator is not allowed in typescript
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
            } else if (activeDragValue.elementType === "arrowAnchorEnd"){
                setElement((prevArrow) => ({
                    ...prevArrow,
                    anchorEnd: {
                        ...prevArrow.anchorEnd,
                        anchorCanvas: {
                            ...prevArrow.anchorEnd.anchorCanvas,
                            x: activeDragValue.placeToLeftX,
                            y: activeDragValue.placeToTopY,
                        }
                    }
                }))
            }

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
        const el = e.currentTarget;
        const bbox = document.getElementById("lineID" + element.arrowID)?.getBoundingClientRect();//e.currentTarget.getBoundingClientRect();
        if (bbox !== undefined) {
            const x = e.clientX - bbox.left;
            const y = e.clientY - bbox.top;
            el.setPointerCapture(e.pointerId);
            newElement = { ...element, movedLeftX: x, movedTopY: y, active: true };
            setElement(newElement);
        }
    }

    // drags the hole arrow
    function handlePointerMove(e: React.PointerEvent<SVGElement>) {
        if (element.active === true) {
            //for redux-state "dragState"
            // get position without margin, but with padding, border, scrollbar
            let arrowBounds = document.getElementById("lineID" + element.arrowID)?.getBoundingClientRect();//e.currentTarget.getBoundingClientRect();
            let parentNode = e.currentTarget.ownerSVGElement;
            if (parentNode !== null && arrowBounds !== undefined) {
                //console.log("arrowBounds:", arrowBounds, "parentNode:", parentNode)
                const parentNodeBounds = parentNode.getBoundingClientRect();

                let placeToLeft = arrowBounds.left - parentNodeBounds.left;
                let placeToTop = arrowBounds.top - parentNodeBounds.top;

                dispatch(setActiveDragElement({
                    elementType: "arrow",
                    ID: element.arrowID,
                    placeToTopY: placeToTop,
                    placeToLeftX: placeToLeft,
                    width: -1,
                    height: -1
                }))
            }

            //for local movement
            let newElement: DragElement;
            const bbox = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - bbox.left;
            const y = e.clientY - bbox.top;


            newElement = {
                ...element,
                anchorStart: {
                    ...element.anchorStart,
                    onCard: -1,
                    anchorCanvas: {
                        ...element.anchorStart.anchorCanvas,
                        x: element.anchorStart.anchorCanvas.x - (element.movedLeftX - x),
                        y: element.anchorStart.anchorCanvas.y - (element.movedTopY - y),
                    }

                },
                anchorEnd: {
                    ...element.anchorEnd,
                    onCard: -1,
                    anchorCanvas: {
                        ...element.anchorEnd.anchorCanvas,
                        x: element.anchorEnd.anchorCanvas.x - (element.movedLeftX - x),
                        y: element.anchorEnd.anchorCanvas.y - (element.movedTopY - y),
                    }
                }
            };
            setElement(newElement);


            props.saveArrow({
                ...props.arrow,
                anchorStart: {
                    ...props.arrow.anchorStart,
                    onCard: -1,
                    anchorCanvas: {
                        ...props.arrow.anchorStart.anchorCanvas,
                        x: element.anchorStart.anchorCanvas.x,
                        y: element.anchorStart.anchorCanvas.y
                    }
                },
                anchorEnd: {
                    ...props.arrow.anchorEnd,
                    onCard: -1,
                    anchorCanvas: {
                        ...props.arrow.anchorEnd.anchorCanvas,
                        x: element.anchorEnd.anchorCanvas.x,
                        y: element.anchorEnd.anchorCanvas.y
                    }

                }
            })


        }
    }
    // drags the hole arrow
    function handlePointerUp(e: React.PointerEvent<SVGElement>) {
        let newElement: DragElement;

        newElement = { ...element, active: false, movedLeftX: -1, movedTopY: -1 };

        setElement(newElement);

        props.saveArrow({
            ...props.arrow,
            anchorStart: {
                ...props.arrow.anchorStart,
                onCard: -1,//element.anchorStart.onCard,
                anchorCanvas: {
                    canvasNumber: element.anchorStart.anchorCanvas.canvasNumber,
                    x: element.anchorStart.anchorCanvas.x,
                    y: element.anchorStart.anchorCanvas.y
                }
            },
            anchorEnd: {
                ...props.arrow.anchorEnd,
                onCard: -1,// element.anchorEnd.onCard,
                anchorCanvas: {
                    canvasNumber: element.anchorEnd.anchorCanvas.canvasNumber,
                    x: element.anchorEnd.anchorCanvas.x,
                    y: element.anchorEnd.anchorCanvas.y
                }
            }
        })
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
                    onPointerUp={(event) => handlePointerUp(event)}
                    onPointerMove={(event) => handlePointerMove(event)}
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