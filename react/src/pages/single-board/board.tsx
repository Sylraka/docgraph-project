import { useEffect, useState } from "react"

import { useNavigate, useLocation } from 'react-router-dom';
import { useAppDispatch } from "../../app/hooks"

import './board.scss';
import DragCard from "./elements/card"
import { BoardName } from "./boardName"
import DragArrow from "./elements/arrow";

import boardsApiSlice, { useFetchSingleBoardQuery } from "../../app/fetch-data/apiSlice"
import { Card, Board, Arrow, useUpdateBoardMutation } from '../../app/fetch-data/apiSlice';
import { setCanvasSize } from "./canvasSizeSlice";


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

    // const[canvasSize, setCanvasSize]=useState<{width: number, height:number}>({
    //     width: -1,
    //     height: -1
    // })


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

    //empty array, effect triggers by mount
    useEffect(() => {

        // Event-Listener hinzufügen
        window.addEventListener('resize', handleResize);
        handleResize()
        const timer = setTimeout(() => {
            // Dieser Code wird nach der Verzögerung ausgeführt
            handleResize()
          },100 );//1000=1sec
        // Cleanup: Event-Listener entfernen, wenn die Komponente unmountet
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [])


    const handleResize = () => {
        const element = document.getElementById('fancy-canvas-wrapper-1')
        const elementWidth = element?.offsetWidth; //oder element.clientWidth
        const elementHeight = element?.offsetHeight;
        console.log("resize!", elementWidth, elementHeight)
        if (elementWidth !== undefined && elementHeight !== undefined) {
            dispatch(setCanvasSize({ width: elementWidth, height: elementHeight }))
        }
    };

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

    
    const saveArrow = (updatedArrow: Arrow) => {
        let updatedArrowList = data?.arrowList.map(arrow => {
            if (arrow.arrowID === updatedArrow.arrowID) {
                return {
                    ...arrow,
                    anchorStart: {
                        ...arrow.anchorStart,
                        onCard: updatedArrow.anchorStart.onCard,
                        anchorCanvas: {
                            canvasNumber: updatedArrow.anchorStart.anchorCanvas.canvasNumber,
                            x: updatedArrow.anchorStart.anchorCanvas.x,
                            y: updatedArrow.anchorStart.anchorCanvas.y
                        }
                    },
                    anchorEnd: {
                        ...arrow.anchorEnd,
                        onCard: updatedArrow.anchorEnd.onCard,
                        anchorCanvas: {
                            canvasNumber: updatedArrow.anchorEnd.anchorCanvas.canvasNumber,
                            x: updatedArrow.anchorEnd.anchorCanvas.x,
                            y: updatedArrow.anchorEnd.anchorCanvas.y
                        }
                    }
                }
            }
            return arrow;
        })

        const updatedBoard: any = {
            ...data,
            arrowList: updatedArrowList
        };
        saveBoard(updatedBoard)
    }


    const saveBoard = async (updatedBoard: Board) => {
        try {

            // Trigger die Mutation
            const result = await updateBoardMutation(updatedBoard).unwrap();

            // with updateboardmutation we cannot actualize the current state, so we have to trigger it manually
            //"query" are the data wen can read or get with a GET
            dispatch(
                boardsApiSlice.util.updateQueryData('fetchSingleBoard', updatedBoard._id, (draft) => {
                    // Lokalen Zustand des Boards mit den neuen Daten aktualisieren
                    Object.assign(draft, updatedBoard);
                })
            );

            //   console.log('Board updated successfully:', result);
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
                                <svg className='svg-canvas' >
                                    {data?.arrowList.map(arrow => (
                                        <DragArrow
                                            arrow={arrow}
                                            cards={data?.cardList}
                                            saveArrow={saveArrow}
                                        />

                                    ))}
                                </svg>
                                <div className="fancy-canvas-wrapper" id="fancy-canvas-wrapper-1">
                                    <div className='squares-wrapper flex-row' >
                                        {cardLists.cardList1.map(card => (
                                            <DragCard
                                                card={card}
                                                boardId={boardId}
                                                saveCard={saveCard}
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





