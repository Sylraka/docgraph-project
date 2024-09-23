import { useRef, useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"


import { setSingleBoardInside, } from "./singleBoardSlice"
import { Board } from '../../app/fetch-data/dataTypes';


export const BoardName = (props: any) => {

    let board = useAppSelector(state => state.singleBoard.board)
    const dispatch = useAppDispatch()


    useEffect(() => {


        setWidth("IDboardName" + props.boardID);


    }, [props.boardID]);



    const setWidth = (fieldId: string) => {
        let element = document.getElementById(fieldId) as HTMLInputElement;

        element.style.width = `${element.value.length + 2}ch`;

    }



    //TODO: boardname size blocker 
    const manageTextInput = (fieldId: string) => {
        let element = document.getElementById(fieldId) as HTMLInputElement;
        setWidth(fieldId);
        console.log(element.value)

        let newBoard: Board
        newBoard = {
            ...board!,
            boardName: element.value
        }

        dispatch(setSingleBoardInside(newBoard));
    }

    if (props.editMode === true) {
        return (
            <label id={"IDlabel"} className="input-sizer">
                <input
                    id={"IDboardName" + props.boardID}
                    className="board-name board-name-input"
                    defaultValue={props.boardName}
                    onInput={() => manageTextInput("IDboardName" + props.boardID)}
                    maxLength={60}
                />
            </label>
        )
    } else {
        return (
            <p className="board-name">{props.boardName}</p>
        )
    }

}