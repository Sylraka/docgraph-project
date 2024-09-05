import { useEffect, useState } from "react"

import { useNavigate, useLocation } from 'react-router-dom';
import { useAppDispatch } from "../../app/hooks"

import './board.scss';
import DragCard from "./elements/card"
import { BoardName } from "./boardName"
import DragArrow from "./elements/arrow";

import boardsApiSlice, { useFetchSingleBoardQuery } from "../../app/fetch-data/apiSlice"
import { Card, Board, useUpdateBoardMutation } from '../../app/fetch-data/apiSlice';


interface cardLists {
    cardList1: Card[]
    cardList2: Card[]
    cardList3: Card[]
}

export const SingleBoard = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const dispatch = useAppDispatch()

    // extract Board-ID from path
    const boardId = location.pathname.split('/').pop() || 'IdNotDefined';
    // Using a query hook automatically fetches data and returns query values
    const { data, isError, isLoading, isSuccess } = useFetchSingleBoardQuery(boardId);
    //umbenennung um namenskonflikte zu vermeiden
    //returns a tuple with a function and an object
    const [updateBoardMutation, { isLoading: updateIsLoading, isSuccess: updateIsSuccess, isError: updateIsError }] = useUpdateBoardMutation();


    const [cardLists, setCardLists] = useState<cardLists>({
        cardList1: [],
        cardList2: [],
        cardList3: [],
    });

    useEffect(() => {
        let newCardList1: Card[] = [];
        let newCardList2: Card[] = [];
        let newCardList3: Card[] = [];

        data?.cardList.forEach(card => {
            if (card.canvasNumber === 1) {
                newCardList1.push(card)
            } else if (card.canvasNumber === 2) {
                newCardList2.push(card)
            } else if (card.canvasNumber === 3) {
                newCardList3.push(card)
            }

        });

        setCardLists({
            cardList1: newCardList1,
            cardList2: newCardList2,
            cardList3: newCardList3,
        })
    }, [data?.cardList]);


    //if i ever want to mutate the board-store without db-request
    const optimisticUpdateCard = (updatedCard: Card) => {
        console.log("test");
        dispatch(
            
            //aktualisiert das board ohne eine db-abfrage
            boardsApiSlice.util.updateQueryData('fetchBoards', undefined, (draft) => {
                const board = draft.find((b) => b._id === boardId);
                console.log("test")
                if (board) {
                    board.cardList.map(draftCard => {
                        if (draftCard.cardID === updatedCard.cardID) {
                            draftCard.x = updatedCard.x;
                            draftCard.y = updatedCard.y;
                            console.log("optimistic updated card:", draftCard);
                        }
                    })
                }
            })
        )
    }

    const saveCard = (updatedCard: Card) => {
        let updatedCardList = data?.cardList.map(card => {
            if (card.cardID === updatedCard.cardID) {
           //    console.log("updated card:", updatedCard )
                return {
                    ...card,
                    x: updatedCard.x,
                    y: updatedCard.y
                }
            }
            return card;
        })

        const updatedBoard: any = {
            ...data,
            cardList: updatedCardList
        };
        saveBoard(updatedBoard)
    }


    const saveBoard = async (updatedBoard: Board) => {
        try {
            
            // Trigger die Mutation
            const result = await updateBoardMutation(updatedBoard).unwrap();

            // with updateboardmutation we cannot actualize the current state, so we have to trigger it manually
            dispatch(
                boardsApiSlice.util.updateQueryData('fetchSingleBoard', updatedBoard._id, (draft) => {
                  // Lokalen Zustand des Boards mit den neuen Daten aktualisieren
                  Object.assign(draft, updatedBoard);
                })
              );

            console.log('Board updated successfully:', result);
        } catch (error) {
            console.error('Failed to update the board:', error);
        }
    }




    if (isError) {
        return (
            <div>
                <h1>There was an error!!!</h1>
            </div>
        )
    }

    if (isLoading) {
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        )
    }

    if (isSuccess) {
        // console.log(data);
        return (
            <>
                <div className="board-name-wrapper">
                    <BoardName
                        editMode={true}
                        boardName={data.boardName}
                        boardID={data._id}
                    />
                    {/*  updateBoardName={props.boardState.updateBoardName} */}
                </div>


                <div className="canvas">
                    <div className='flex-row'>
                        {/* <Sidebar />*/}

                        <div className="three-canvas-container">
                            <div className="flex-row" id="three-canvas-inner">
                                {/* {data?.arrowList.map(arrow => {
                                    // <DragArrow
                                    //     arrow={data.arrowList}>

                                    // </DragArrow>

                                })} */}
                                {/* <CanvasSVG cardList={cardLists.cardList1}/> */}

                                <div className="fancy-canvas-wrapper" id="fancy-canvas-wrapper-1">
                                    <div className='squares-wrapper flex-row' >
                                        {cardLists.cardList1.map(card => (
                                            <DragCard
                                                card={card}
                                                boardId={boardId}
                                                saveCard={saveCard}
                                                optimisticUpdateCard={optimisticUpdateCard}
                                            />
                                        ))}
                                    </div>
                                </div>

                                <div className="fancy-canvas-wrapper" id="fancy-canvas-wrapper-2">
                                    <div className='squares-wrapper'>
                                        {cardLists.cardList2.map(card => (
                                            <DragCard
                                                card={card}
                                                boardId={boardId}
                                                saveCard={saveCard}
                                                optimisticUpdateCard={optimisticUpdateCard}
                                            />
                                        ))}
                                    </div>
                                </div>



                                <div className="fancy-canvas-wrapper" id="fancy-canvas-wrapper-3">
                                    <div className='squares-wrapper' >
                                        {cardLists.cardList3.map(card => (
                                            <DragCard
                                                card={card}
                                                boardId={boardId}
                                                saveCard={saveCard}
                                                optimisticUpdateCard={optimisticUpdateCard}
                                            />
                                        ))}
                                    </div>
                                </div>

                            </div>
                        </div>



                    </div>


                </div>


            </>
        )
    }

    return null
}





