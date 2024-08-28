//draggable https://www.npmjs.com/package/react-draggable#react-draggable
import { useState, useRef, useEffect } from "react";
import { Card } from '../../app/fetch-data/apiSlice';
import './canvas.css';

import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';


interface canvasProps {
    cardList: Card[]
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

    const [elements, setElements] = useState<DragElement[]>(
        // the attributes the cards didnt have
        props.cardList.map(card => ({
            ...card,
            active: false,
            movedLeftX: -1, // Initialwert für xOffset
            movedTopY: -1, // Initialwert für yOffset
        }))

    );

    //fill in the cards when they are loaded
    useEffect(() => {
        setElements(
            props.cardList.map(card => ({
                ...card,
                active: false,
                movedLeftX: -1, // Initialwert für xOffset
                movedTopY: -1, // Initialwert für yOffset
            }))
        );

        // props.cardState.cardTypes.map(cardType => {
        //   if (cardType === 'math') {
        //     setIsMathOn(true)
        //   }
        // });


    }, [props]);

    const onStart = (event: DraggableEvent, data: DraggableData) => { }
    const onStop = (card: DragElement) => (event: DraggableEvent, data: DraggableData) => {

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

         
        }
    }

    const onDrag = (event: DraggableEvent, data: DraggableData) => { }

    const dragElements = elements.map(function (item) {
        return (
            <>
                <Draggable
                    key={item.cardID}
                    //cancel=".strong"
                    // onStart={onStart}
                    onStop={onStop(item)}
                    // onDrag={onDrag}
                    position={{ x: item.x, y: item.y }}
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
                            style={{ 'width': item.width - 10, 'height': item.height - 40 }}
                        >
                            <p
                                className='text-element'
                                style={{ 'width': item.width - 20, 'height': item.height - 40 }}
                            >
                                {item.text}
                            </p>
                        </div>
                    </div>
                </Draggable>
            </>
        );
    });



    return (
        <>

            {dragElements}

        </>

    );
}