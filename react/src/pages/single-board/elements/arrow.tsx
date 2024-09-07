//dragNdrop svg: https://gist.github.com/hashrock/0e8f10d9a233127c5e33b09ca6883ff4

import React, { useState, useEffect } from 'react';

import { Card, Arrow } from '../../../app/fetch-data/apiSlice';
import "./arrow.css";
import SvgArrowHead from "./arrowHead"

//we need that to read the state
import { useAppSelector } from '../../../app/hooks'; // Pfad zu deinem custom Hook


interface canvasProps {
    arrow: Arrow;
    saveArrow: (param: Arrow) => void
}




export default function ArrowComponent(props: canvasProps) {
    const activeDragValue = useAppSelector((state) => state.drag)


    const [arrow, setArrow] = useState<Arrow>({
        ...props.arrow
    });


    useEffect(() => {

        if (activeDragValue.ID === arrow.anchorStart.onCard && activeDragValue.elementType === "card") {


            //point-operator is not allowed in typescript
            setArrow((prevArrow) => ({
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
                ...arrow,
                anchorStart: {
                    ...arrow.anchorStart,
                    anchorCanvas: {
                        ...arrow.anchorStart.anchorCanvas,
                        x: activeDragValue.placeToLeftX,
                        y: activeDragValue.placeToTopY
                    }
                },
            })
        }

        if (activeDragValue.ID === arrow.anchorEnd.onCard && activeDragValue.elementType === "card") {

            //point-operator is not allowed in typescript
            setArrow((prevArrow) => ({
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
                ...arrow,
                anchorEnd: {
                    ...arrow.anchorEnd,
                    anchorCanvas: {
                        ...arrow.anchorEnd.anchorCanvas,
                        x: activeDragValue.placeToLeftX,
                        y: activeDragValue.placeToTopY
                    }

                }
            })
        }

    }, [activeDragValue])





    // function handlePointerDown(e: React.PointerEvent<SVGElement>) {
    //     let newElements = elements.map(function (item, index2): DragElement {
    //         if (index1 === index2) {
    //             const el = e.currentTarget;
    //             const bbox = e.currentTarget.getBoundingClientRect();
    //             const x = e.clientX - bbox.left;
    //             const y = e.clientY - bbox.top;
    //             el.setPointerCapture(e.pointerId);
    //             return { ...item, movedLeftX: x, movedTopY: y, active: true };
    //         }
    //         return item
    //     });

    //     setElements(newElements);
    // }

    // function handlePointerMove( e: React.PointerEvent<SVGElement>) {
    //     let newElements = elements.map(function (item, index2): DragElement {
    //         if (index1 === index2 && item.active === true) {
    //             const bbox = e.currentTarget.getBoundingClientRect();
    //             const x = e.clientX - bbox.left;
    //             const y = e.clientY - bbox.top;

    //             return {
    //                 ...item,
    //                 x: item.x - (item.movedLeftX - x),
    //                 y: item.y - (item.movedTopY - y),
    //             };
    //         }
    //         return item;
    //     });
    //     setElements(newElements);
    // }

    // function handlePointerUp(e: React.PointerEvent<SVGElement>) {
    //     let newElements = elements.map(function (item, index2): DragElement {
    //         if (index1 === index2) {
    //             console.log("item: ", item)

    //             //TODO: drag stop per canvas 1-3
    //             // if(item.canvasNumber === 1){
    //             //   if(item.x >= 100){
    //             //     item.x=100;
    //             //   }
    //             // }
    //             return { ...item, active: false, movedLeftX: -1, movedTopY: -1 };
    //         }
    //         return item;
    //     });

    //     setElements(newElements);
    // }







    return (
        <>

            <g
                key={arrow.arrowID}
            >
                <line
                    x1={arrow.anchorStart.anchorCanvas.x}
                    y1={arrow.anchorStart.anchorCanvas.y}
                    x2={arrow.anchorEnd.anchorCanvas.x}
                    y2={arrow.anchorEnd.anchorCanvas.y}
                    stroke="#006666"
                    strokeWidth={3}
                // onPointerDown={(event) => handlePointerDown(event)}
                // onPointerUp={(event) => handlePointerUp(event)}
                // onPointerMove={(event) => handlePointerMove(event)}
                />

                <SvgArrowHead
                    arrow={arrow}
                />
            </g>
        </>
    );
}