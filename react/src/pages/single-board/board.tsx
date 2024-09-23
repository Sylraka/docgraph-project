import { useEffect, useState } from "react"

import { useNavigate, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from "../../app/hooks"

import './board.scss';

//show elements
import DragCard from "./elements/card"
import { BoardName } from "./boardName"
import DragArrow from "./elements/arrow";
import CardText from "./elements/cardText";
import ArrowFocus from "./elements/arrowFocus"
import { Sidebar } from "./sidebar";
import CardFocus from "./elements/cardFocus"

// from the redux slices 
import { Card, Board, Arrow } from '../../app/fetch-data/dataTypes';
import { removeFocusElement } from "./elements/focusSlice"
import {
    fetchData, clearState,
    setSingleBoardInside, setCardInside, setArrowInside,
    updateBoardInDb,
    addNewArrowInside, addNewCardInside,
    deleteArrowInside, deleteCardInside
} from "./singleBoardSlice"

//for insert new elements
import { useDrop } from "react-dnd";
import { ItemTypes } from './../../dragConstants';
import { newArrowData, newCardData } from './../../app/newElementData';


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
        accept: [ItemTypes.NEWCARD, ItemTypes.NEWARROW],
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
            } else {
                console.error("ItemType not found:", monitor.getItemType())
            }
        }
    });



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

                    <div className="three-canvas-container">
                        <div className="flex-row" id="three-canvas-inner">
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
                                <CardText
                                    key={"cardTextNr" + card.cardID}
                                    card={card}
                                />
                            ))}




                            <div className="fancy-canvas-wrapper" id="fancy-canvas-wrapper-1">
                                <div className='squares-wrapper flex-row' >
                                </div>
                            </div>

                            <div className="fancy-canvas-wrapper" id="fancy-canvas-wrapper-2">
                                <div className='squares-wrapper'>
                                </div>
                            </div>



                            <div className="fancy-canvas-wrapper" id="fancy-canvas-wrapper-3">
                                <div className='squares-wrapper' >
                                </div>
                            </div>

                        </div>
                    </div>



                </div>


            </div>


        </>
    )

}





