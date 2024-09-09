import { useState, useEffect } from "react";

import { Arrow } from '../../../app/fetch-data/apiSlice';
import "./arrow.css" 

type propTypes = {
    arrow: Arrow,
};

interface anchorCanvas {
    canvasNumber: number;
    x: number,
    y: number
}

//TODO make arrowhead as marker-element: https://developer.mozilla.org/en-US/docs/Web/SVG/Element/marker
const SvgArrowHead = (props: propTypes) => {









    return (
        <>
            <g
            >
                <circle
                r="7"
                cx={props.arrow.anchorEnd.anchorCanvas.x}
                cy={props.arrow.anchorEnd.anchorCanvas.y}
                fill='white'
                stroke='black'
                stroke-width='1'
                className='focusPoints'>
                </circle>
                <circle
                r="7"
                cx={props.arrow.anchorStart.anchorCanvas.x}
                cy={props.arrow.anchorStart.anchorCanvas.y}
                fill='white'
                stroke='black'
                stroke-width='1'
                className='focusPoints'>
                </circle>



            </g>
        </>
    );
};

export default SvgArrowHead;
