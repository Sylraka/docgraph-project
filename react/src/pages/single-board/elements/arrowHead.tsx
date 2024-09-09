import { useState, useEffect } from "react";

import { Arrow } from '../../../app/fetch-data/apiSlice';
import "./arrow.css" 

type propTypes = {
    arrow: Arrow,

    computeRotation: (startPoint: anchorCanvas, endPoint: anchorCanvas) => number
};

interface anchorCanvas {
    canvasNumber: number;
    x: number,
    y: number
}

//TODO make arrowhead as marker-element: https://developer.mozilla.org/en-US/docs/Web/SVG/Element/marker
const SvgArrowHead = (props: propTypes) => {
    const arrowNormal = "M-5,0 L0,10 L5,0 L0,2.5 Z";

    const [arrowTransform, setArrowTransform] = useState({
        transform: "translate(" + 0 + "px, " + 0 + "px) rotate(" + 0 + "deg)",
    });



    useEffect(() => {

        const rotation = props.computeRotation(props.arrow.anchorStart.anchorCanvas, props.arrow.anchorEnd.anchorCanvas)

        //console.log(rotation)

        if (props.arrow.anchorEnd !== undefined) {

            setArrowTransform({
                transform:
                    "translate(" + 
                     (props.arrow.anchorEnd.anchorCanvas.x ) +
                    "px, " + 
                    (props.arrow.anchorEnd.anchorCanvas.y )+
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
