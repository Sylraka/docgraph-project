

import { useState, useEffect } from "react"

import "./card.css"

import { useAppDispatch, useAppSelector } from "./../../../app/hooks"
import { Board, LinkCard } from '../../../app/fetch-data/dataTypes';



import { fetchBoardById, setCardInside, fetchData } from "../../../app/fetch-data/singleBoardSlice"
import { removeFocusElement } from "../../slices/focusSlice"
import { Link } from "react-router-dom";

import linkImgFrom from "../../../images/link.png"
import linkImgTo from "../../../images/link_02.png"

interface canvasProps {
    link: LinkCard;
}



export default function CardTextComponent(props: canvasProps) {
    const activeDragValue = useAppSelector((state) => state.drag)
    const dispatch = useAppDispatch()
    const [element, setElement] = useState<LinkCard>({
        ...props.link,
    });
    const [linkedCard, setLinkedCard] = useState<Board>();

    useEffect(() => {
        const fetchLinkedCard = async () => {
            let fetchedCard;
            if (props.link.isFromBoard === true) {
                fetchedCard = await dispatch(fetchBoardById(props.link.toID)).unwrap();
            } else {
                fetchedCard = await dispatch(fetchBoardById(props.link.fromID)).unwrap();
            }
            setLinkedCard(fetchedCard);
        };

        fetchLinkedCard();
    }, [dispatch, props.link]); // Abhängigkeit von `dispatch` und `props.link`



    useEffect(() => {
        if (activeDragValue.elementType === "link") {
            setTextPosition();
        }

    }, [activeDragValue]);


    const setTextPosition = () => {

        if (activeDragValue.ID === props.link.fromArrowID.toString() && activeDragValue.elementType === "link") {
            setElement((prevElement) => ({
                ...prevElement,
                linkPosition:{
                    x: activeDragValue.placeToLeftX +100,
                    y: activeDragValue.placeToTopY +50
                }

            }))
        }
    }

    const klickAtTextarea = () => {
        dispatch(removeFocusElement())
    }

    return (
        props.link.isFromBoard === true ? (
            //when the arrow starts at board
            <div>

                <p
                    key={props.link.fromArrowID.toString()}
                    id={"textID" + props.link.fromArrowID}
                    className="link-card-text card-field-input no-cursor strong"
                    style={{
                        top: element.linkPosition.y - 50,
                        left: element.linkPosition.x -55,
                        width: 100,
                        height: 77
                    }}
                    onClick={klickAtTextarea}
                >
                    {/* Überprüfung, ob linkedCard verfügbar ist */}
                    {linkedCard ? linkedCard.boardName : "Loading..."}
                </p>
                <Link to={{
                    pathname: "/board/" + props.link.toID
                }} className=""
                    onClick={() => dispatch(fetchData(props.link.toID))}
                >


                    <img className="link-image" alt="go to board" src={linkImgTo}
                        style={{ 'top': element.linkPosition.y -15, 'left': element.linkPosition.x -90 }}

                    />
                </Link>
            </div>
        ) : (
            //when the arrow ends at board
            <div>

                <p

                    key={props.link.fromArrowID}
                    id={"textID" + props.link.fromArrowID}
                    className="link-card-text card-field-input no-cursor strong"
                    style={{
                        top: element.linkPosition.y - 50,
                        left: element.linkPosition.x -55,
                        width: 100,
                        height: 77
                    }}
                    onClick={klickAtTextarea}
                >
                    {/* Überprüfung, ob linkedCard verfügbar ist */}
                    {linkedCard ? linkedCard.boardName : "Loading..."}
                </p>
                <Link to={{
                    pathname: "/board/" + props.link.fromID
                }} className=""
                    onClick={() => dispatch(fetchData(props.link.fromID))}
                >

                    <img className="link-image" alt="go to board" src={linkImgFrom}
                        style={{ 'top': element.linkPosition.y -25, 'left': element.linkPosition.x - 110 }}
                    />
                </Link>
            </div>
        )

    );
}