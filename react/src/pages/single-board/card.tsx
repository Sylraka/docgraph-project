//draggable https://www.npmjs.com/package/react-draggable#react-draggable
import { useState, useRef, useEffect } from "react";
import { Card } from '../../app/fetch-data/apiSlice';
import './canvas.css';

import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';


interface canvasProps {
    card: Card
}


//the attributes we need to drag plus the card attributes
interface DragElement {
    x: number;
    y: number;
    active: boolean;
    movedLeftX: number;
    movedTopY: number;
    canvasNumber: number;
    cardID: number;
    width: number;
    height: number;
    text: string;
    math: object;
}

export default function CanvasComponent(props: canvasProps) {

    const [element, setElement] = useState<DragElement>({
        // the attributes the cards didnt have
        ...props.card,
        active: false,
        movedLeftX: -1, // Initialwert für xOffset
        movedTopY: -1, // Initialwert für yOffset

    });

    //fill in the cards when they are loaded
    useEffect(() => {
        setElement({
            ...props.card,
            active: false,
            movedLeftX: -1, // Initialwert für xOffset
            movedTopY: -1, // Initialwert für yOffset
        })
        

    // props.cardState.cardTypes.map(cardType => {
    //   if (cardType === 'math') {
    //     setIsMathOn(true)
    //   }
    // });


}, [props]);

const onStart = (event: DraggableEvent, data: DraggableData) => { }
const onStop = (event: DraggableEvent, data: DraggableData) => {

    // get position without margin, but with padding, border, scrollbar
    let cardBounds = data.node.getBoundingClientRect();
    let parentNode = data.node.parentNode;
    if (parentNode !== null) {
        const parentNodeBounds = (parentNode as HTMLElement).getBoundingClientRect();

        console.log("cardBounds", cardBounds)
        console.log("parentNodeBounds", parentNodeBounds)
        let placeToTop = cardBounds.top - parentNodeBounds.top;
        let placeToRight = parentNodeBounds.right - cardBounds.right;
        let placeToBottom = parentNodeBounds.bottom - cardBounds.bottom;
        let placeToLeft = cardBounds.left - parentNodeBounds.left;

        setElement(prevState => ({
            ...prevState,
            x: placeToLeft,
            y: placeToTop
          }))
    }
}

const onDrag = (event: DraggableEvent, data: DraggableData) => { 


}






return (
    <>
        <Draggable
            key={element.cardID}
            //cancel=".strong"
            // onStart={onStart}
            onStop={onStop}
            // onDrag={onDrag}
            position={{ x: element.x, y: element.y }}
        // position={{ x: item.movedLeftX, y: item.movedTopY }}
        >
            <div className="drag-box">
                {/* <div
                        className={'box' + (item.active ? ' grabbing' : '')}
                        id={"cardID" + item.cardID}
                        style={{ left: item.x, top: item.y, width: item.width }}
                    > 
                     
                     </div>
                     
                     */}

                <div className="drag-box-text"
                    style={{ 'width': element.width - 10, 'height': element.height - 40 }}
                >
                    <p
                        className='text-element'
                        style={{ 'width': element.width - 20, 'height': element.height - 40 }}
                    >
                        {element.text}
                    </p>
                </div>
            </div>
        </Draggable>

    </>

);
}