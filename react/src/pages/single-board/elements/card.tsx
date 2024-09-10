//draggable https://www.npmjs.com/package/react-draggable#react-draggable
import { useState, useRef, useEffect } from "react";
import { Card } from '../../../app/fetch-data/apiSlice';
import './card.css';

import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';

import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { setActiveDragElement, removeActiveDrag, DragState } from "./dragSlice"


interface canvasProps {
    card: Card,
    boardId: string,
    saveCard: (param: Card) => void,
}


//the attributes we need to drag plus the card attributes
interface DragElement extends Card{
    active: boolean;
    movedLeftX: number;
    movedTopY: number;
}

export default function CardComponent(props: canvasProps) {
    const dispatch = useAppDispatch()
    //const activeDragValue = useAppSelector((state) => state.drag)




    const [element, setElement] = useState<DragElement>({
        // the attributes the cards didnt have
        ...props.card,
        active: false,
        movedLeftX: -1, // Initialwert für xOffset
        movedTopY: -1, // Initialwert für yOffset

    });

    //fill in the cards when they are loaded
    // useEffect(() => {
    //     // setElement({
    //     //     ...props.card,
    //     //     active: false,
    //     //     movedLeftX: -1, // Initialwert für xOffset
    //     //     movedTopY: -1, // Initialwert für yOffset
    //     // })

    //     // props.cardState.cardTypes.map(cardType => {
    //     //   if (cardType === 'math') {
    //     //     setIsMathOn(true)
    //     //   }
    //     // });
    // }, [props]);



    function handlePointerDown(e: React.PointerEvent<SVGElement>) {
        let newElement: DragElement;
        const el = e.currentTarget;
        const bbox = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - bbox.left;
        const y = e.clientY - bbox.top;
        el.setPointerCapture(e.pointerId);
        newElement = { ...element, movedLeftX: x, movedTopY: y, active: true };
        setElement(newElement);
    }

    function handlePointerMove(e: React.PointerEvent<SVGElement>) {
        if (element.active === true) {

            //for redux-state "dragState"
            // get position without margin, but with padding, border, scrollbar
            let cardBounds = e.currentTarget.getBoundingClientRect();
            let parentNode = e.currentTarget.ownerSVGElement;
            if (parentNode !== null) {

                const parentNodeBounds = parentNode.getBoundingClientRect();

                let placeToTop = cardBounds.top - parentNodeBounds.top;
                let width =  cardBounds.width
                let height = cardBounds.height
                let placeToLeft = cardBounds.left - parentNodeBounds.left;
               // console.log("topy cardbound",cardBounds.top, "parent ",parentNodeBounds.top, "result: ",placeToTop)
               // console.log("leftx cardbound",cardBounds.left, "parent ",parentNodeBounds.left, "result: ",placeToLeft)
               console.log("placeToTop",placeToTop,"width",width, "height", height, "placeToLeft", placeToLeft)
                dispatch(setActiveDragElement({
                    elementType: "card",
                    ID: element.cardID,
                    placeToTopY: placeToTop,
                    width: width,
                    height: height,
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
                x: element.x - (element.movedLeftX - x),
                y: element.y - (element.movedTopY - y),
            };

            setElement(newElement);
        }
    }

    function handlePointerUp(e: React.PointerEvent<SVGElement>) {
        let newElement: DragElement;
     //   console.log("element: ", element)

        newElement = { ...element, active: false, movedLeftX: -1, movedTopY: -1 };

        setElement(newElement);

        props.saveCard({
            ...props.card,
            x: element.x,
            y: element.y
        })
    }



    return (
        <>

            <g
                key={element.cardID.toString()}
            >
                <rect
                    x={element.x}
                    y={element.y}
                    fill="#555555"
                    stroke="white"
                    rx="10"
                    width={element.width + 30}
                    height={element.height + 30}
                    onPointerDown={(event) => handlePointerDown(event)}
                    onPointerUp={(event) => handlePointerUp(event)}
                    onPointerMove={(event) => handlePointerMove(event)}
                />
                <rect
                    x={element.x + 15}
                    y={element.y + 15}
                    width={element.width}
                    height={element.height}
                    fill="white"
                    rx="6"
                />
            </g>

        </>
    );

    // return (
    //     <>
    //         <Draggable
    //             key={element.cardID}
    //             //cancel=".strong"
    //             onStart={onStart}
    //             onStop={onStop}
    //             onDrag={onDrag}
    //             position={{ x: element.x, y: element.y }}
    //         // position={{ x: item.movedLeftX, y: item.movedTopY }}
    //         >
    //             <div className="drag-box">
    //                 {/* <div
    //                     className={'box' + (item.active ? ' grabbing' : '')}
    //                     id={"cardID" + item.cardID}
    //                     style={{ left: item.x, top: item.y, width: item.width }}
    //                 > 

    //                  </div>

    //                  */}

    //                 <div className="drag-box-text"
    //                     style={{ 'width': element.width - 10, 'height': element.height - 40 }}
    //                 >
    //                     <p
    //                         className='text-element'
    //                         style={{ 'width': element.width - 20, 'height': element.height - 40 }}
    //                     >
    //                         {element.text}
    //                     </p>
    //                 </div>
    //             </div>
    //         </Draggable>

    //     </>

    // );

}