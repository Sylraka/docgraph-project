import { useEffect, useState } from "react"
import { useFetchSingleBoardQuery } from "../../app/fetch-data/apiSlice"
import { useNavigate, useLocation } from 'react-router-dom';
import CanvasComponent from "./canvas";

import './board.scss';

export const Board = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // extract Board-ID from path
    const boardId = location.pathname.split('/').pop() || 'IdNotDefined';
    // Using a query hook automatically fetches data and returns query values
    const { data, isError, isLoading, isSuccess } = useFetchSingleBoardQuery(boardId);

   

    useEffect(() => {
     
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
                    <div className='tilingSprite'>
                        <div className='flex-row'>
                            {/* <Sidebar />*/}

                            <div className="three-canvas-container">
                                <div className="flex-row" id="three-canvas-inner">
                                    <CanvasComponent
                                    cardList={data?.cardList}
                                    />
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