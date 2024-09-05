import { useEffect } from "react"


export const BoardName = (props: any) => {


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