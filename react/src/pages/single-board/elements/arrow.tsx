//dragNdrop svg: https://gist.github.com/hashrock/0e8f10d9a233127c5e33b09ca6883ff4

import React, { useState, useEffect } from 'react';

import { Card, Arrow } from '../../../app/fetch-data/apiSlice';
import "./arrow.css";
import SvgArrowHead from "./arrowHead"
import ArrowFocus from "./arrowFocus"

//we need that to read the state
import { useAppDispatch, useAppSelector } from '../../../app/hooks'; // Pfad zu deinem custom Hook
import { setActiveDragElement, removeActiveDrag } from "./dragSlice"



interface canvasProps {
    arrow: Arrow;
    saveArrow: (param: Arrow) => void
}

interface anchorCanvas {
    canvasNumber: number;
    x: number,
    y: number,

}

interface DragElement extends Arrow {
    active: boolean,
    movedLeftX: number,
    movedTopY: number,
}


export default function ArrowComponent(props: canvasProps) {
    const dispatch = useAppDispatch()
    const activeDragValue = useAppSelector((state) => state.drag)


    const [element, setElement] = useState<DragElement>({
        ...props.arrow,
        active: false,
        movedLeftX: -1, // Initialwert für xOffset
        movedTopY: -1, // Initialwert für yOffset

    });


    //every time the activeDragSlice triggers a card-movement, the arrows render again
    useEffect(() => {

        if (activeDragValue.ID === element.anchorStart.onCard && activeDragValue.elementType === "card") {


            //point-operator is not allowed in typescript
            setElement((prevArrow) => ({
                ...prevArrow,
                anchorStart: {
                    ...prevArrow.anchorStart,
                    anchorCanvas: {
                        ...prevArrow.anchorStart.anchorCanvas,
                        x: activeDragValue.placeToLeftX,
                        y: activeDragValue.placeToTopY
                    }
                }
            }))


            props.saveArrow({
                ...props.arrow,
                anchorStart: {
                    ...props.arrow.anchorStart,
                    anchorCanvas: {
                        ...props.arrow.anchorStart.anchorCanvas,
                        x: activeDragValue.placeToLeftX,
                        y: activeDragValue.placeToTopY
                    }
                },
            })
        }

        if (activeDragValue.ID === element.anchorEnd.onCard && activeDragValue.elementType === "card") {

            //point-operator is not allowed in typescript
            setElement((prevArrow) => ({
                ...prevArrow,
                anchorEnd: {
                    ...prevArrow.anchorEnd,
                    anchorCanvas: {
                        ...prevArrow.anchorEnd.anchorCanvas,
                        x: activeDragValue.placeToLeftX,
                        y: activeDragValue.placeToTopY
                    }
                }
            }))


            props.saveArrow({
                ...props.arrow,
                anchorEnd: {
                    ...props.arrow.anchorEnd,
                    anchorCanvas: {
                        ...props.arrow.anchorEnd.anchorCanvas,
                        x: activeDragValue.placeToLeftX,
                        y: activeDragValue.placeToTopY
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
        //if (rotation < 0) rotation = 360 + rotation; // range [0, 360)
        rotation += 180;

        //  console.log(rotation)
        return (rotation);
    }




    // experimental, drags the hole arrow
    function handlePointerDown(e: React.PointerEvent<SVGElement>) {
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
    // experimental, drags the hole arrow
    function handlePointerMove(e: React.PointerEvent<SVGElement>) {
        if (element.active === true) {
            //for redux-state "dragState"
            // get position without margin, but with padding, border, scrollbar
            let arrowBounds = document.getElementById("lineID" + element.arrowID)?.getBoundingClientRect();//e.currentTarget.getBoundingClientRect();
            let parentNode = e.currentTarget.ownerSVGElement;
            if (parentNode !== null && arrowBounds !== undefined) {

                console.log("arrowBounds:", arrowBounds, "parentNode:", parentNode)
                const parentNodeBounds = parentNode.getBoundingClientRect();

                let placeToTop = arrowBounds.top - parentNodeBounds.top;
                let placeToRight = parentNodeBounds.right - arrowBounds.right;
                let placeToBottom = parentNodeBounds.bottom - arrowBounds.bottom;
                let placeToLeft = arrowBounds.left - parentNodeBounds.left;
                // console.log("topy cardbound",cardBounds.top, "parent ",parentNodeBounds.top, "result: ",placeToTop)
                // console.log("leftx cardbound",cardBounds.left, "parent ",parentNodeBounds.left, "result: ",placeToLeft)
                dispatch(setActiveDragElement({
                    elementType: "arrow",
                    ID: element.arrowID,
                    placeToTopY: placeToTop,
                    placeToRight: placeToRight,
                    placeToBottom: placeToBottom,
                    placeToLeftX: placeToLeft
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
                    anchorCanvas: {
                        ...element.anchorStart.anchorCanvas,
                        x: element.anchorStart.anchorCanvas.x - (element.movedLeftX - x),
                        y: element.anchorStart.anchorCanvas.y - (element.movedTopY - y),
                    }

                },
                anchorEnd: {
                    ...element.anchorEnd,
                    anchorCanvas: {
                        ...element.anchorEnd.anchorCanvas,
                        x: element.anchorEnd.anchorCanvas.x - (element.movedLeftX - x),
                        y: element.anchorEnd.anchorCanvas.y - (element.movedTopY - y),
                    }
                }

            };

            props.saveArrow({
                ...props.arrow,
                anchorStart: {
                    ...props.arrow.anchorStart,
                    anchorCanvas: {
                        ...props.arrow.anchorStart.anchorCanvas,
                        x: element.anchorStart.anchorCanvas.x,
                        y: element.anchorStart.anchorCanvas.y
                    }
                },
                anchorEnd: {
                    ...props.arrow.anchorEnd,
                    anchorCanvas: {
                        ...props.arrow.anchorEnd.anchorCanvas,
                        x: element.anchorEnd.anchorCanvas.x,
                        y: element.anchorEnd.anchorCanvas.y
                    }

                }
            })

            setElement(newElement);
        }
    }
    // experimental, drags the hole arrow
    function handlePointerUp(e: React.PointerEvent<SVGElement>) {
        let newElement: DragElement;
        //   console.log("element: ", element)

        newElement = { ...element, active: false, movedLeftX: -1, movedTopY: -1 };

        setElement(newElement);

        props.saveArrow({
            ...props.arrow,
            anchorStart: {
                ...props.arrow.anchorStart,
                onCard: element.anchorStart.onCard,
                anchorCanvas: {
                    canvasNumber: element.anchorStart.anchorCanvas.canvasNumber,
                    x: element.anchorStart.anchorCanvas.x,
                    y: element.anchorStart.anchorCanvas.y
                }
            },
            anchorEnd: {
                ...props.arrow.anchorEnd,
                onCard: element.anchorEnd.onCard,
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
                    arrow={props.arrow}
                    computeRotation={computeRotation}
                />

                {/* <ArrowFocus
                    arrow={props.arrow}
                /> */}
                {/* 
                {isFocus && (
                    <>
                    </>
                )} */}

            </g>

        </>
    );
}