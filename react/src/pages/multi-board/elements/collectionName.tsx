import { useRef, useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"


import { setCollectionName } from "../../../app/fetch-data/collectionSlice"
import { Collection } from '../../../app/fetch-data/dataTypes';

import "../multiBoard.css"

export const CollectionName = (props: any) => {

    let collection = useAppSelector(state => state.collections.currentCollection)
    const dispatch = useAppDispatch()


    useEffect(() => {


        setWidth("IDcollectionname" + collection?._id);

    }, [collection]);



    const setWidth = (fieldId: string) => {
        let element = document.getElementById(fieldId) as HTMLInputElement;
     //   console.log(collection?._id, fieldId, element)
        element.style.width = `${element.value.length + 2}ch`;

    }



    //TODO: boardname size blocker 
    const manageTextInput = (fieldId: string) => {
        let element = document.getElementById(fieldId) as HTMLInputElement;
        setWidth(fieldId);
    //    console.log(element.value)


        dispatch(setCollectionName(element.value));
    }

    return (
        <div className="board-name-wrapper">
        <label id={"IDlabel"} className="collection-name-label input-sizer">
            <input
                id={"IDcollectionname" + collection?._id}
                className="board-name board-name-input"
                value={collection?.collectionName}
                onInput={() => manageTextInput("IDcollectionname" + collection?._id)}
                maxLength={50}
            />
        </label>
        </div>
    )


}