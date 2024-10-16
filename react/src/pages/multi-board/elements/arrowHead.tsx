import { useState, useEffect } from "react";

import { Arrow } from '../../../app/fetch-data/dataTypes';
import "../../single-board/elements/arrow.css";
import { DragElement } from "./multiBoardArrow";

type propTypes = {
    arrow: DragElement,

    computeRotation: (startPoint: anchorCanvas, endPoint: anchorCanvas) => number
};

interface anchorCanvas {
    onCard: String,
    boardRubrics: String[],
    x: number,
    y: number,
}

//TODO make arrowhead as marker-element: https://developer.mozilla.org/en-US/docs/Web/SVG/Element/marker
const SvgArrowHead = (props: propTypes) => {
    const arrowNormal = "M-5,0 L0,10 L5,0 L0,2.5 Z";

    const [arrowTransform, setArrowTransform] = useState({
        transform: "translate(" + 0 + "px, " + 0 + "px) rotate(" + 0 + "deg)",
    });



    useEffect(() => {

        const rotation = props.computeRotation(props.arrow.anchorStart, props.arrow.anchorEnd)

        //console.log(rotation)

        if (props.arrow.anchorEnd !== undefined) {

            setArrowTransform({
                transform:
                    "translate(" + 
                     (props.arrow.anchorEnd.x ) +
                    "px, " + 
                    (props.arrow.anchorEnd.y )+
                    "px) rotate(" + 
                    rotation +
                    "deg)",
            });
        }
    }, [props.arrow]);






    return (
        <>
            <g
                className="arrowHeadWrapper"
                style={arrowTransform}
            >
                <path
                    d={arrowNormal}
                    stroke='#006666'
                    //  tabIndex={0}
                    fill="000"
                    strokeWidth="4"
                    pointerEvents="stroke"
                    className="arrowHead"
                />
                <line x1="5" y1="0" x2="5" y2="13"
                    stroke="none"
                    opacity={1.0}
                    className="arrowHead" />

                    
            </g>
        </>
    );
};

export default SvgArrowHead;
