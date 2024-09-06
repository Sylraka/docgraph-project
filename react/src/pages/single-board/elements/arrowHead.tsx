import { useState, useEffect } from "react";

import { Arrow } from '../../../app/fetch-data/apiSlice';


type propTypes = {
    arrow: Arrow
};

interface anchorCanvas {
    canvasNumber: number;
    x: number,
    y: number
}

//TODO make arrowhead as marker-element: https://developer.mozilla.org/en-US/docs/Web/SVG/Element/marker
const SvgArrowHead = (props: propTypes) => {
    const arrowNormal = "M0,0 L5,10 L10,0 L5,2.5 Z";

    const [arrowTransform, setArrowTransform] = useState({
        transform: "translate(" + 0 + "px, " + 0 + "px) rotate(" + 0 + "deg)",
    });



    useEffect(() => {

        const rotation = computeRotation(props.arrow.anchorStart.anchorCanvas, props.arrow.anchorEnd.anchorCanvas)

        //console.log(rotation)

        if (props.arrow.anchorEnd !== undefined) {

            setArrowTransform({
                transform:
                    "translate(" + 
                     (props.arrow.anchorEnd.anchorCanvas.x - 4) +
                    "px, " + 
                    (props.arrow.anchorEnd.anchorCanvas.y + 5) +
                    "px) rotate(" + 
                    rotation +
                    "deg)",
            });
        }
    }, [props.arrow]);




    const computeRotation = (startPoint: anchorCanvas, endPoint: anchorCanvas) => {
        //positive== right side, negative==left side
        let differenceX = startPoint.x - endPoint.x;
        let differenceY = startPoint.y - endPoint.y;

        let rotation = Math.atan2(differenceX, differenceY); // range (-PI, PI]
        rotation *= -1 * (180 / Math.PI)  // rads to degs, range (-180, 180]
        //if (rotation < 0) rotation = 360 + rotation; // range [0, 360)
        rotation += 180;

        //console.log(rotation)
        return (rotation);
    }

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
