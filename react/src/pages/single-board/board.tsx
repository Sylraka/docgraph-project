import { useEffect, useState } from "react"

import { useNavigate, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from "../../app/hooks"

import './board.scss';
import DragCard from "./elements/card"
import { BoardName } from "./boardName"
import DragArrow from "./elements/arrow";
import CardText from "./elements/cardText";
import ArrowFocus from "./elements/arrowFocus"

import { Card, Board, Arrow } from '../../app/fetch-data/dataTypes';
import { removeFocusElement } from "./elements/focusSlice"
import { fetchData, setSingleBoardInside, setCardInside, setArrowInside, updateBoardInDb } from "./singleBoardSlice"


export const SingleBoard = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const dispatch = useAppDispatch()

    // extract Board-ID from path
    const boardId = location.pathname.split('/').pop() || 'IdNotDefined';
    // Using a query hook automatically fetches data and returns query values
    //const { data, isError, isLoading, isSuccess } = useFetchSingleBoardQuery(boardId);
    //umbenennung um namenskonflikte zu vermeiden
    //returns a tuple with a function and an object
    //const [updateBoardMutation, { isLoading: updateIsLoading, isSuccess: updateIsSuccess, isError: updateIsError }] = useUpdateBoardMutation();

    let data = useAppSelector(state => state.singleBoard.board)
    let activeFocusValue = useAppSelector((state) => state.focus)



    useEffect(() => {
        console.log("triggerAPI")
        dispatch(fetchData(boardId))
    },
        []);


    const saveCard = (updatedCard: Card) => {
        dispatch(setCardInside(updatedCard));

    }

    const saveArrow = (updatedArrow: Arrow) => {
        dispatch(setArrowInside(updatedArrow));
    }


    const saveDBBoard = (updatedBoard: Board) => {
        dispatch(updateBoardInDb(updatedBoard));
    }


    // const saveBoard = async (updatedBoard: Board) => {
    //     try {

    //         // Trigger die Mutation
    //         const result = await updateBoardMutation(updatedBoard).unwrap();

    //         // with updateboardmutation we cannot actualize the current state, so we have to trigger it manually
    //         //"query" are the data wen can read or get with a GET
    //         dispatch(
    //             boardsApiSlice.util.updateQueryData('fetchSingleBoard', updatedBoard._id, (draft) => {
    //                 // Lokalen Zustand des Boards mit den neuen Daten aktualisieren
    //                 Object.assign(draft, updatedBoard);
    //             })
    //         );

    //         //   console.log('Board updated successfully:', result);
    //     } catch (error) {
    //         console.error('Failed to update the board:', error);
    //     }
    // }

    const handlePointerDown = (event: React.PointerEvent<SVGSVGElement>) => {
        const svg = event.target.toString()
        if (svg === "[object SVGSVGElement]") {
            console.log('SVG clicked, but not on an element!', svg);
            dispatch(removeFocusElement())
        }
    }



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
                    {/* <Sidebar />*/}

                    <div className="three-canvas-container">
                        <div className="flex-row" id="three-canvas-inner">
                            <svg className='svg-canvas' id="svg-canvas-id"
                                onPointerDown={handlePointerDown}>
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





