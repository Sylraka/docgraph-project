import { useEffect, useState, useRef } from "react"

import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { setNavigationToMultiBoard } from "./../slices/navigationSlice"

//for insert new elements
import { useDrop } from "react-dnd";
import { ItemTypes } from '../../dragConstants';

import { Sidebar } from "./nav-bar/multiSidebar";

import { BoardMiniature } from "./boardMiniature";
import BoardMiniatureText from "./boardMiniatureText"
import "./multiBoard.css"

export const MultiBoard = () => {

    const dispatch = useAppDispatch()
    let data = useAppSelector(state => state.allBoards)


    useEffect(() => {
        dispatch(setNavigationToMultiBoard());
    }, [])


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
                {/* <div style={{ 'width': "100px", 'height': "100px" }}></div> */}
                <svg
                    style={{ 'width': "2000px", 'height': "2000px" }}
                    className="svg-multi-board">
                    {data?.boards?.map(board => (
                        <BoardMiniature
                            key={"boardNr" + board._id}
                            board={board}
                        />

                    ))}

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





