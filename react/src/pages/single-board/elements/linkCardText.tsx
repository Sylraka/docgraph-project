

import { useState, useEffect } from "react"

import "./card.css"

import { useAppDispatch, useAppSelector } from "./../../../app/hooks"
import { Board, LinkCard } from '../../../app/fetch-data/dataTypes';



import { fetchBoardById, setCardInside, } from "../../../app/fetch-data/singleBoardSlice"
import { removeFocusElement } from "../../slices/focusSlice"
import { Link } from "react-router-dom";

import linkImgFrom from "../../../images/link.png"
import linkImgTo from "../../../images/link_02.png"

interface canvasProps {
    card: LinkCard;
}



export default async function CardTextComponent(props: canvasProps) {
    const activeDragValue = useAppSelector((state) => state.drag)
    const dispatch = useAppDispatch()
    const [element, setElement] = useState<LinkCard>({
        ...props.card,
    });
    let linkedCard: Board
    if (props.card.isFromBoard === true) {
        linkedCard = await dispatch(fetchBoardById(props.card.toID)).unwrap()
    } else { 
        linkedCard = await dispatch(fetchBoardById(props.card.fromID)).unwrap()
    }



    useEffect(() => {
        if (activeDragValue.elementType === "card") {
            setTextPosition();
        }

    }, [activeDragValue]);


    const setTextPosition = () => {

        if (activeDragValue.ID === props.card.fromArrowID.toString() && activeDragValue.elementType === "card") {
            setElement((prevElement) => ({
                ...prevElement,
                x: activeDragValue.placeToLeftX + 60,
                y: activeDragValue.placeToTopY
            }))
        }
    }

    const klickAtTextarea = () => {
        dispatch(removeFocusElement())
    }

    return (
        props.card.isFromBoard === true ? (
            //when the arrow starts at board
            <>
                <Link to={{
                    pathname: "/board/" + props.card.toID
                }} className="">

                    <img className="link-image" alt="go to board" src={linkImgTo}
                        style={{ 'top': element.linkPosition.y - (22), 'left': element.linkPosition.x - 105 }}
                    />
                </Link>
                <p
                    key={props.card.fromArrowID.toString()}
                    id={"textID" + props.card.fromArrowID}
                    className="text-element card-field-input no-cursor strong"
                    style={{
                        top: element.linkPosition.y - 15,
                        left: element.linkPosition.x - 78,
                        width: 200,
                        height: 300
                    }}
                    onClick={klickAtTextarea}
                >
                    {linkedCard.boardName}
                </p>
            </>
        ) : (
            //when the arrow ends at board
            <>
                <Link to={{
                    pathname: "/board/" + props.card.fromID
                }} className="">

                    <img className="link-image" alt="go to board" src={linkImgFrom}
                        style={{ 'top': element.linkPosition.y - (22), 'left': element.linkPosition.x - 105 }}
                    />
                </Link>
                <p
                    key={props.card.fromArrowID}
                    id={"textID" + props.card.fromArrowID}
                    className="text-element card-field-input no-cursor strong"
                    style={{
                        top: element.linkPosition.y - 15,
                        left: element.linkPosition.x - 78,
                        width: 200,
                        height: 300
                    }}
                    onClick={klickAtTextarea}
                >
                    {linkedCard.boardName}
                </p>
            </>
        )
    );
}