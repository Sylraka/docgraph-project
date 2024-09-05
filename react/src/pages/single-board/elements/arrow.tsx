//dragNdrop svg: https://gist.github.com/hashrock/0e8f10d9a233127c5e33b09ca6883ff4

import React, { useState } from 'react';

import { Arrow } from '../../../app/fetch-data/apiSlice';
import "./arrow.css";

interface canvasProps {
    arrow: Arrow;
}



interface ArrowHead {
    rotationHead: number;
    anchor: {
        anchorID: number;
        x: number;
        y: number;
    };
}


export default function ArrowComponent(props: canvasProps) {
    const [arrow, setArrow] = useState<Arrow>({
        ...props.arrow
    });



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
            <svg className='svg-canvas'
            >
                 <g
                    key={arrow.arrowID}
                >
                    <line
                        x1={arrow.anchorStart.anchorCanvas.x}
                        y1={arrow.anchorStart.anchorCanvas.y}
                        x2={arrow.anchorEnd.anchorCanvas.x}
                        y2={arrow.anchorEnd.anchorCanvas.y}
                        stroke="#555555"
                        // onPointerDown={(event) => handlePointerDown(event)}
                        // onPointerUp={(event) => handlePointerUp(event)}
                        // onPointerMove={(event) => handlePointerMove(event)}
                    />
                </g>
            </svg>
        </>
    );
}