import { useEffect, useState, useRef } from "react"

import { useNavigate, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from "../../app/hooks"

import './board.scss';

//show elements
import DragCard from "./elements/card"
import { BoardName } from "./boardName"
import DragArrow from "./elements/arrow";
import CardText from "./elements/cardText";
import ArrowFocus from "./elements/arrowFocus"
import { Sidebar } from "./nav-bar/sidebar";
import CardFocus from "./elements/cardFocus";
import CardMath from "./elements/cardMath"

// from the redux slices 
import { Card, Board, Arrow } from '../../app/fetch-data/dataTypes';
import { removeFocusElement } from "../slices/focusSlice"
import {
    fetchData, clearState,
    setSingleBoardInside, setCardInside, setArrowInside,
    updateBoardInDb,
    addNewArrowInside, addNewCardInside,
    deleteArrowInside, deleteCardInside
} from "../../app/fetch-data/singleBoardSlice"
import { setNavigationToSingleBoard } from "../slices/navigationSlice"

//for insert new elements
import { useDrop } from "react-dnd";
import { ItemTypes } from './../../dragConstants';
import { newArrowData, newCardData, newCardMathData } from './../../app/newElementData';


export const SingleBoard = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const dispatch = useAppDispatch()

    // extract Board-ID from path
    const boardId = location.pathname.split('/').pop() || 'IdNotDefined';

    let data = useAppSelector(state => state.singleBoard.board)
    let activeFocusValue = useAppSelector((state) => state.focus)


    useEffect(() => {
        dispatch(fetchData(boardId))
        dispatch(setNavigationToSingleBoard())
    }, [])


    //to prevent "stale closure problem": have an old state if we didnt hear to activeFocusValue
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            //console.log("klick", event.key)
            if (event.key === 'Backspace') {
                console.log('Entf/Entfernen-Taste gedrückt, activeFocusValue:', activeFocusValue);
                if (activeFocusValue.elementType === "arrow") {
                    console.log("delete arrow")
                    dispatch(deleteArrowInside(activeFocusValue.ID));
                }
                if (activeFocusValue.elementType === "card") {
                    console.log("delete card")
                    dispatch(deleteCardInside(activeFocusValue.ID))
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


    const saveCard = (updatedCard: Card) => {
        dispatch(setCardInside(updatedCard));

    }

    const saveArrow = (updatedArrow: Arrow) => {
        dispatch(setArrowInside(updatedArrow));
    }


    const saveDBBoard = (updatedBoard: Board) => {
        dispatch(updateBoardInDb(updatedBoard));
    }


    const handlePointerDown = (event: React.PointerEvent<SVGSVGElement>) => {
        const svg = event.target.toString()
        if (svg === "[object SVGSVGElement]") {
            console.log('SVG clicked, but not on an element!', svg);
            dispatch(removeFocusElement())
        }
    }


    // more info to usedrop in https://codesandbox.io/s/react-dnd-02-chess-board-and-lonely-knight-7buy2?from-embed=&file=/src/components/BoardSquare.js:394-653
    const [, dropRef] = useDrop({
        accept: [ItemTypes.NEWCARD, ItemTypes.NEWARROW, ItemTypes.NEWCARDMATH],
        //TODO: get the cursorCoords and add them to newCardData

        drop: (item, monitor) => {
            console.log(item, monitor.getItemType())
            if (monitor.getItemType() === 'newCard') {
                console.log("newCard trigger")
                dispatch(addNewCardInside(newCardData))
                //props.boardState.handleCardFunctions.newCard(newCardData());
            } else if (monitor.getItemType() === 'newArrow') {
                console.log("newArrow trigger")
                dispatch(addNewArrowInside(newArrowData))
                // props.boardState.handleArrowFunctions.newArrow(newArrowData());
            } else if (monitor.getItemType() === 'newCardMath') {
                console.log("newCard Math trigger")
                dispatch(addNewCardInside(newCardMathData))
            } else {
                console.error("ItemType not found:", monitor.getItemType())
            }
        }
    });


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
            <div className="board-name-wrapper">
                <BoardName
                    editMode={true}
                    boardName={data?.boardName}
                    boardID={data?._id}
                />
                {/*  updateBoardName={props.boardState.updateBoardName} */}
            </div>


            <div className="canvas">
                <div className='flex-row'>
                    <Sidebar />

                    <div className="three-canvas-container"
                                    ref={divRef}
                                    onPointerMove={event => handlePointerMove(event)}
                                    onPointerUp={handlePointerUp}
                                    onContextMenu={event => handleRightClick(event)} // Rechtsklick-Event starten
                    >
                            <svg className='svg-canvas' id="svg-canvas-id"
                                onPointerDown={handlePointerDown}
                                ref={dropRef}
                            >
                                {data?.arrowList.map(arrow => (
                                    <DragArrow
                                        key={"arrowNr" + arrow.arrowID}
                                        arrow={arrow}
                                        saveArrow={saveArrow}
                                    />

                                ))}
                                {data?.cardList.map(card => (
                                    <DragCard
                                        key={"cardNr" + card.cardID}
                                        card={card}
                                        boardId={boardId}
                                        saveCard={saveCard}
                                    />
                                ))}
                                {data?.arrowList.map(arrow => (
                                    activeFocusValue.elementType === "arrow" && activeFocusValue.ID === arrow.arrowID && (
                                        <ArrowFocus
                                            key={"arrowFocusNr" + arrow.arrowID}
                                            arrow={arrow}
                                            saveArrow={saveArrow}
                                        />
                                    )

                                ))}
                                {data?.cardList.map(card => (
                                    activeFocusValue.elementType === "card" && activeFocusValue.ID === card.cardID && (
                                        < CardFocus
                                            key={"cardFocusNr" + card.cardID}
                                            card={card}
                                            saveCard={saveCard}
                                        />



                                    )
                                ))}

                            </svg>

                            {data?.cardList.map(card => (
                                (card.cardType === "primitive" && <CardText
                                    key={"cardTextNr" + card.cardID}
                                    card={card}
                                />
                                )
                            ))}
                            {data?.cardList.map(card => (
                                (card.cardType === "math" && <CardMath
                                    key={"cardMathNr" + card.cardID}
                                    card={card}
                                />
                                )
                            ))}
                        </div>




                </div>


            </div>


        </>
    )

}





