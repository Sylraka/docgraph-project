import { useEffect, useState, useRef } from "react"

import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { setNavigationToMultiBoard } from "./../slices/navigationSlice"

//for insert new elements
import { useDrop } from "react-dnd";
import { ItemTypes } from '../../dragConstants';
import { createNewArrow, deleteArrowFromDb, updateArrowsInDb } from "../../app/fetch-data/multiBoardArrowSlice"
import { createNewBoard, deleteBoardFromDb, fetchAllBoardsFromCollection, updateBoardsInDb } from "../../app/fetch-data/allBoardsSlice"
import { newMultiBoardArrowData } from "../../app/newElementData"
import { newBoardData } from "../../app/newBoardData"
import { clearState } from "../../app/fetch-data/singleBoardSlice";

import { Sidebar } from "./nav-bar/multiSidebar";


import { BoardMiniature } from "./elements/boardMiniature";
import BoardMiniatureText from "./elements/boardMiniatureText"
import { BoardMiniatureFocus } from "./elements/boardMiniatureFocus";

import "./multiBoard.css"

import { ArrowComponent } from "./elements/multiBoardArrow"
import { fetchAllArrows } from "../../app/fetch-data/multiBoardArrowSlice"

import { ArrowFocus } from "./elements/multiBoardArrowFocus"
import { removeFocusElement } from "../slices/focusSlice";
import { useLocation } from "react-router-dom";


export const MultiBoard = () => {

    const dispatch = useAppDispatch()
    let data = useAppSelector(state => state.allBoards)
    let arrows = useAppSelector(state => state.multiBoardArrow)
    let activeFocusValue = useAppSelector((state) => state.focus)
    const location = useLocation();


    // extract Board-ID from path
    const collectionID = location.pathname.split('/').pop() || 'IdNotDefined';

    useEffect(() => {
        dispatch(setNavigationToMultiBoard());
        dispatch(fetchAllArrows({ collectionID }))
        dispatch(fetchAllBoardsFromCollection({ collectionID }));
        dispatch(clearState())

        return () => {
            // Clean-up code, der beim Unmounten ausgeführt wird
            dispatch(updateBoardsInDb(data.boards))
            dispatch(updateArrowsInDb(arrows.multiBoardArrows))
        };
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

    const handlePointerDown = (event: React.PointerEvent<SVGSVGElement>) => {
        const svg = event.target.toString()
        if (svg === "[object SVGSVGElement]") {
            console.log('SVG clicked, but not on an element!', svg);
            dispatch(removeFocusElement())
        }
    }

    //to prevent "stale closure problem": have an old state if we didnt hear to activeFocusValue
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            //console.log("klick", event.key)
            if (event.key === 'Backspace') {
                console.log('Entf/Entfernen-Taste gedrückt, activeFocusValue:', activeFocusValue);
                if (activeFocusValue.elementType === "arrow") {

                    console.log("delete arrow")
                    dispatch(deleteArrowFromDb(activeFocusValue.ID));


                }
                if (activeFocusValue.elementType === "board") {
                    // Öffnet ein Bestätigungsdialog
                    const confirmed = window.confirm("Are you sure you want to delete this board? This cannot be undone.");

                    if (confirmed) {
                        // Der Benutzer hat "OK" geklickt
                        console.log("delete board")
                        dispatch(deleteBoardFromDb(activeFocusValue.ID))
                    } else {
                        // Der Benutzer hat "Abbrechen" geklickt
                        console.log("Aktion abgebrochen");
                    }

                }
            }
        };

        // Event Listener hinzufügen
        window.addEventListener('keydown', handleKeyDown);

        // Cleanup-Funktion, um den Event Listener zu entfernen
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [activeFocusValue]);

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
                    onPointerDown={event => handlePointerDown(event)}
                    ref={dropRef}
                    style={{ 'width': "2000px", 'height': "2000px" }}
                    className="svg-multi-board">

                    {arrows?.multiBoardArrows?.map(arrow =>
                        <ArrowComponent
                            key={"multiBoardArrowNr" + arrow._id}
                            arrow={arrow}
                        />
                    )}
                    {data?.boards?.map(board => (
                        <BoardMiniature
                            key={"boardNr" + board._id}
                            board={board}
                        />
                    ))}


                    {arrows?.multiBoardArrows?.map(arrow => (
                        activeFocusValue.elementType === "arrow" && activeFocusValue.ID === arrow._id && (
                            <ArrowFocus
                                key={"multiBoardArrowFocusNr" + arrow._id}
                                arrow={arrow}
                            />
                        )

                    ))}
                    {data?.boards?.map(board => (
                        activeFocusValue.elementType === "board" && activeFocusValue.ID === board._id! && (
                            < BoardMiniatureFocus
                                key={"boardMiniatireFocusNr" + board._id}
                                board={board}
                            />
                        )
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





