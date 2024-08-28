import { useEffect, useState } from "react"
import { useFetchSingleBoardQuery } from "../../app/fetch-data/apiSlice"
import { useNavigate, useLocation } from 'react-router-dom';

import './board.scss';
import CanvasComponent from "./elements/canvas-draggable";
import CanvasSVG from "./elements/canvas-svg";
import DragCard from "./elements/card"

import { Card } from '../../app/fetch-data/apiSlice';

interface cardLists {
    cardList1: Card[]
    cardList2: Card[]
    cardList3: Card[]
}

export const Board = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // extract Board-ID from path
    const boardId = location.pathname.split('/').pop() || 'IdNotDefined';
    // Using a query hook automatically fetches data and returns query values
    const { data, isError, isLoading, isSuccess } = useFetchSingleBoardQuery(boardId);


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

                                {/* <CanvasSVG cardList={cardLists.cardList1}/> */}

                                <div className="fancy-canvas-wrapper" id="fancy-canvas-wrapper-1">
                                    <div className='squares-wrapper flex-row' >
                                        {cardLists.cardList1.map(card => (
                                            <DragCard
                                                card={card}
                                            />
                                        ))}
                                    </div>
                                </div>

                                <div className="fancy-canvas-wrapper" id="fancy-canvas-wrapper-2">
                                    <div className='squares-wrapper'>
                                        {cardLists.cardList2.map(card => (
                                            <DragCard
                                                card={card}
                                            />
                                        ))}
                                    </div>
                                </div>



                                <div className="fancy-canvas-wrapper" id="fancy-canvas-wrapper-3">
                                    <div className='squares-wrapper' >
                                        {cardLists.cardList3.map(card => (
                                            <DragCard
                                                card={card}
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





const BoardName = (props: any) => {


    useEffect(() => {

        if (props.editMode === true) {
            setWidth("IDboardName" + props.boardID);
        }
    }, [props.boardID]);



    const setWidth = (fieldId: string) => {
        let element = document.getElementById(fieldId);
        //  element.parentNode.dataset.value = element.value;
        console.log("setwidth is not implemented yet")
    }

    //TODO: boardname size blocker 
    const manageTextInput = (fieldId: string) => {
        let element = document.getElementById(fieldId);
        setWidth(fieldId);
        //props.updateBoardName(element.value);
        console.log("manageTextInput is not implemented yet")
    }

    if (props.editMode === true) {
        return (
            <label id={"IDlabel"} className="input-sizer">
                <input
                    id={"IDboardName" + props.boardID}
                    className="board-name board-name-input"
                    defaultValue={props.boardName}
                    onInput={() => manageTextInput("IDboardName" + props.boardID)}
                />
            </label>
        )
    } else {
        return (
            <p className="board-name">{props.boardName}</p>
        )
    }

}