import { useState, useEffect } from "react";

import { Arrow } from '../../../app/fetch-data/apiSlice';
import "./arrow.css" 

import { DragElement } from "./arrow";

type propTypes = {
    arrow: Arrow,
    element: DragElement,
    setElement: (DragElement: DragElement) => void

};

interface anchorCanvas {
    canvasNumber: number;
    x: number,
    y: number
}

//TODO make arrowhead as marker-element: https://developer.mozilla.org/en-US/docs/Web/SVG/Element/marker
const SvgArrowHead = (props: propTypes) => {



   const handlePointerDown = (event: React.PointerEvent<SVGElement>) => {

   }





    return (
        <>
            <g
            >
                <circle
                r="6"
                cx={props.arrow.anchorEnd.anchorCanvas.x}
                cy={props.arrow.anchorEnd.anchorCanvas.y}
                fill='#3399ff'
                stroke='white'
                stroke-width='1'
                className='focusPoints'
                onPointerDown={event => handlePointerDown(event)}
                >
            
                </circle>
                <circle
                r="6"
                cx={props.arrow.anchorStart.anchorCanvas.x}
                cy={props.arrow.anchorStart.anchorCanvas.y}
                fill='#3399ff'
                stroke='white'
                stroke-width='1'
                className='focusPoints'>
                </circle>



            </g>
        </>
    );
};

export default SvgArrowHead;
