import { useEffect, useState, useRef } from "react"

import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { setNavigationToMultiBoard } from "./../slices/navigationSlice"

//for insert new elements
import { useDrop } from "react-dnd";
import { ItemTypes } from '../../dragConstants';
import { createNewArrow } from "../../app/fetch-data/multiBoardArrowSlice"
import { createNewBoard } from "../../app/fetch-data/allBoardsSlice"
import { newMultiBoardArrowData } from "../../app/newElementData"
import { newBoardData } from "../../app/newBoardData"

import { Sidebar } from "./nav-bar/multiSidebar";

import { BoardMiniature } from "./elements/boardMiniature";
import BoardMiniatureText from "./elements/boardMiniatureText"
import "./multiBoard.css"

import { ArrowComponent } from "./elements/multiBoardArrow"
import { fetchAllArrows } from "../../app/fetch-data/multiBoardArrowSlice"


export const MultiBoard = () => {

    const dispatch = useAppDispatch()
    let data = useAppSelector(state => state.allBoards)
    let arrows = useAppSelector(state => state.multiBoardArrow)

    useEffect(() => {
        dispatch(setNavigationToMultiBoard());
        dispatch(fetchAllArrows())
    }, [])

    const [, dropRef] = useDrop({
        accept: [ItemTypes.NEWMULTIBOARDARROW, ItemTypes.NEWBOARD],
        //TODO: get the cursorCoords and add them to newCardData

        drop: (item, monitor) => {
            console.log(item, monitor.getItemType())
            if (monitor.getItemType() === 'newMultiBoardArrow') {
                console.log("newMultiBoardArrow trigger")
                dispatch(createNewArrow(newMultiBoardArrowData))
            }
            else if (monitor.getItemType() === 'newBoard') {
                console.log("newBoard trigger")
                dispatch(createNewBoard(newBoardData))
            }
            //} 
            else {
                console.error("ItemType not found:", monitor.getItemType())
            }
        }
    });


    //for moving the whole canvas
    const divRef = useRef<HTMLDivElement>(null); // Referenz auf das div-Element
    const [isDragging, setIsDragging] = useState(false); // Zustand für das Ziehen
    const [startPoint, setStartPoint] = useState({ x: 0, y: 0 }); // Startpunkt der Maus
    const [scrollPosition, setScrollPosition] = useState({ left: 0, top: 0 }); // Scrollposition

    // Rechtsklick-Event (startet das Ziehen)
    const handleRightClick = (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault(); // Verhindert das Standard-Kontextmenü
        setIsDragging(true); // Setzt den Dragging-Zustand
        setStartPoint({ x: event.clientX, y: event.clientY }); // Startposition der Maus
        const div = divRef.current;
        if (div) {
            setScrollPosition({
                left: div.scrollLeft,
                top: div.scrollTop
            });
        }
    };

    // Bewegt das SVG, indem die Scrollposition des div geändert wird
    const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
        if (isDragging) {
            const div = divRef.current;
            // Berechnung der neuen Scroll-Position relativ zur Mausbewegung
            if (div) {
                div.scrollLeft = scrollPosition.left - (event.clientX - startPoint.x);
                div.scrollTop = scrollPosition.top - (event.clientY - startPoint.y);
            }
        }
    };

    // Beendet das Ziehen, wenn die Maus losgelassen wird
    const handlePointerUp = () => {
        setIsDragging(false); // Beendet den Dragging-Zustand
    };



    // console.log(data);
    return (
        <>
            <div className="svg-multi-board-wrapper"
                ref={divRef}
                onPointerMove={event => handlePointerMove(event)}
                onPointerUp={handlePointerUp}
                onContextMenu={event => handleRightClick(event)} // Rechtsklick-Event starten
            >
                <Sidebar />
                 <svg
                    ref={dropRef}
                    style={{ 'width': "2000px", 'height': "2000px" }}
                    className="svg-multi-board">
                    {data?.boards?.map(board => (
                        <BoardMiniature
                            key={"boardNr" + board._id}
                            board={board}
                        />
                    ))}

                    {arrows?.multiBoardArrows?.map(arrow=>
                        <ArrowComponent
                        key={"multiBoardArrowNr" + arrow._id}
                        arrow={arrow}
                        />
                    )}

                </svg>
                {data?.boards?.map(board => (
                    <BoardMiniatureText
                        key={"boardTextNr" + board._id}
                        board={board}
                    />
                ))}

            </div>




        </>
    )

}





