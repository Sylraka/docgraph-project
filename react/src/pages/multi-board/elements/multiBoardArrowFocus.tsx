import { useState, useEffect } from "react";

import { Board, multiBoardArrow } from '../../../app/fetch-data/dataTypes';
import "../../single-board/elements/arrow.css";

//we need that to read the state
import { useAppDispatch, useAppSelector } from '../../../app/hooks'; // path to custom Hook
import { setActiveDragElement, removeActiveDrag, DragState } from "../../slices/dragSlice"
import overCardSlice, { setOverCard, removeOverCard } from "../../slices/overCardSlice"
import { fetchBoardById, fetchData, updateBoardInDb } from "../../../app/fetch-data/singleBoardSlice"
import { fetchAllBoardsFromCollection, setBoard } from "../../../app/fetch-data/allBoardsSlice"

import { setArrowInside, updateArrowInDb } from "../../../app/fetch-data/multiBoardArrowSlice"


type propTypes = {
    arrow: multiBoardArrow,
};
interface DragElement extends multiBoardArrow {
    active: boolean;
    offsetX: number;
    offsetY: number;
}



export const ArrowFocus = (props: propTypes) => {
    const overCardState = useAppSelector((state) => state.overCard)
    const dispatch = useAppDispatch()

    const [element, setElement] = useState<DragElement>({
        // the attributes the cards didnt have
        ...props.arrow,
        active: false,
        offsetX: -1, //place between element left and mouse
        offsetY: -1, // place between element top and mouse

    });


    const allBoards = useAppSelector(state => state.allBoards.boards);






    const handlePointerDown = (event: React.PointerEvent<SVGElement>, location: string) => {
        let anchor: any;
        if (location === "Start") {
            anchor = props.arrow.anchorStart
        } else {
            anchor = props.arrow.anchorEnd
        }

        const el = event.currentTarget;
        let bounds = event.currentTarget.getBoundingClientRect();

        const x = event.clientX - bounds.left;
        const y = event.clientY - bounds.top;

        //console.log("clientX:", event.clientX , "bounds:", bounds.left)

        //element "fängt" den pointer ein, selbst wenn die maus außerhalb des elements liegt, erhält es weiter pointerevents
        // wie pointermove, pointerup, bis zeiger losgelkassen wird
        el.setPointerCapture(event.pointerId);

        // dispatch(setActiveDragElement(newElement))
        let newElement = { ...props.arrow, offsetX: x, offsetY: y, active: true };
        setElement(newElement)


        //remove links from card
        let ellipseElement;
        const elementUnderPointer1 = document.elementFromPoint(event.clientX + 15, event.clientY + 15);
        const elementUnderPointer2 = document.elementFromPoint(event.clientX - 15, event.clientY + 15);
        const elementUnderPointer3 = document.elementFromPoint(event.clientX + 15, event.clientY - 15);
        const elementUnderPointer4 = document.elementFromPoint(event.clientX - 15, event.clientY - 15);
        const elementUnderPointer5 = document.elementFromPoint(event.clientX + 10, event.clientY + 10);
        const elementUnderPointer6 = document.elementFromPoint(event.clientX - 10, event.clientY + 10);
        const elementUnderPointer7 = document.elementFromPoint(event.clientX + 10, event.clientY - 10);
        const elementUnderPointer8 = document.elementFromPoint(event.clientX - 10, event.clientY - 10);
        const elementUnderPointer9 = document.elementFromPoint(event.clientX + 20, event.clientY + 20);
        const elementUnderPointer10 = document.elementFromPoint(event.clientX - 20, event.clientY + 20);
        const elementUnderPointer11 = document.elementFromPoint(event.clientX + 20, event.clientY - 20);
        const elementUnderPointer12 = document.elementFromPoint(event.clientX - 20, event.clientY - 20);



        if (elementUnderPointer1 && elementUnderPointer1.tagName === 'ellipse') {
            ellipseElement = elementUnderPointer1
        } else if (elementUnderPointer2 && elementUnderPointer2.tagName === 'ellipse') {
            ellipseElement = elementUnderPointer2
        } else if (elementUnderPointer3 && elementUnderPointer3.tagName === 'ellipse') {
            ellipseElement = elementUnderPointer3
        } else if (elementUnderPointer4 && elementUnderPointer4.tagName === 'ellipse') {
            ellipseElement = elementUnderPointer4
        } else if (elementUnderPointer5 && elementUnderPointer5.tagName === 'ellipse') {
            ellipseElement = elementUnderPointer5
        } else if (elementUnderPointer6 && elementUnderPointer6.tagName === 'ellipse') {
            ellipseElement = elementUnderPointer6
        } else if (elementUnderPointer7 && elementUnderPointer7.tagName === 'ellipse') {
            ellipseElement = elementUnderPointer7
        } else if (elementUnderPointer8 && elementUnderPointer8.tagName === 'ellipse') {
            ellipseElement = elementUnderPointer8
        } else if (elementUnderPointer9 && elementUnderPointer9.tagName === 'ellipse') {
            ellipseElement = elementUnderPointer9
        } else if (elementUnderPointer10 && elementUnderPointer10.tagName === 'ellipse') {
            ellipseElement = elementUnderPointer10
        } else if (elementUnderPointer11 && elementUnderPointer11.tagName === 'ellipse') {
            ellipseElement = elementUnderPointer11
        } else if (elementUnderPointer12 && elementUnderPointer12.tagName === 'ellipse') {
            ellipseElement = elementUnderPointer12
        } else {
            ellipseElement = undefined
        }

        let id: String;
        if (ellipseElement !== undefined) {
            id = ellipseElement.id;
            console.log('we delete links from boardid ', id);

            const toDraggedBoard = allBoards!.filter(board => board._id! === ellipseElement.id);
            //append link to second board
            const updatedBoard = {
                ...toDraggedBoard[0], // Kopiere alle anderen Eigenschaften des Boards
                linkList: toDraggedBoard[0].linkList.filter(link => link.fromArrowID !== props.arrow._id)
            };
            // Dispatch update action and await for completion if necessary
            dispatch(updateBoardInDb(updatedBoard))
            dispatch(setBoard(updatedBoard))

            let ifArrowHasSecondAnchorBoard = allBoards!.filter(board =>
                board.linkList.some(link => link.fromArrowID === props.arrow._id)
            );
            ifArrowHasSecondAnchorBoard.forEach(board => {
                if (board._id !== toDraggedBoard[0]._id) {
                    console.log('there is a second anchor we have to update ', ifArrowHasSecondAnchorBoard);
                    if (location === "Start") {
                        const newLink1 = {
                            fromArrowID: props.arrow._id!,
                            isFromBoard: false,
                            fromID: "",
                            toID: board._id!,
                            linkPosition: {
                                x: 200,
                                y: 500
                            }
                        }
                        const newLinkList = board.linkList.filter(link => link.fromArrowID !== props.arrow._id).concat(newLink1)
                        const newSecondBoard = {
                            ...board,
                            linkList: newLinkList
                        }
                        dispatch(updateBoardInDb(newSecondBoard))
                        dispatch(setBoard(newSecondBoard))
                    } else {
                        const newLink2 = {
                            fromArrowID: props.arrow._id!,
                            isFromBoard: true,
                            fromID: board._id!,
                            toID: "",
                            linkPosition: {
                                x: 200,
                                y: 500
                            }
                        }
                        const newLinkList = board.linkList.filter(link => link.fromArrowID !== props.arrow._id).concat(newLink2)
                        const newSecondBoard = {
                            ...board,
                            linkList: newLinkList
                        }
                        dispatch(updateBoardInDb(newSecondBoard))
                        dispatch(setBoard(newSecondBoard))


                    }

                }
            }
            )

        }

    }




    const handlePointerMove = (event: React.PointerEvent<SVGElement>, location: string) => {
        if (element.active === true) {

            // manually pointer-enter-event over a little offset in all four corners, tracks overCardStatus
            let ellipseElement;
            const elementUnderPointer1 = document.elementFromPoint(event.clientX + 10, event.clientY + 10);
            const elementUnderPointer2 = document.elementFromPoint(event.clientX - 10, event.clientY + 10);
            const elementUnderPointer3 = document.elementFromPoint(event.clientX + 10, event.clientY - 10);
            const elementUnderPointer4 = document.elementFromPoint(event.clientX - 10, event.clientY - 10);

            if (elementUnderPointer1 && elementUnderPointer1.tagName === 'ellipse') {
                ellipseElement = elementUnderPointer1
            } else if (elementUnderPointer2 && elementUnderPointer2.tagName === 'ellipse') {
                ellipseElement = elementUnderPointer2
            } else if (elementUnderPointer3 && elementUnderPointer3.tagName === 'ellipse') {
                ellipseElement = elementUnderPointer3
            } else if (elementUnderPointer4 && elementUnderPointer4.tagName === 'ellipse') {
                ellipseElement = elementUnderPointer4
            } else {
                ellipseElement = undefined
            }

            let id: String;
            if (ellipseElement !== undefined) {
                id = ellipseElement.id;
                console.log('Pointer entered ellipse nr', id);
                dispatch(setOverCard(id))
            } else {
                dispatch(removeOverCard())
                // console.log('pointer is free')
                console.log("arrowID:", element._id)
            }


            let bounds = event.currentTarget.getBoundingClientRect();
            //for local movement
            const x = event.clientX - bounds.left;
            const y = event.clientY - bounds.top;

            let newElement: DragElement;
            let newDragElement: DragState;

            if (location === "Start") {
                //for updating the arrow, he is listening to dragState
                newDragElement = {
                    elementType: "arrowAnchor" + location,
                    ID: "dragStart" + props.arrow._id!,
                    placeToLeftX: element.anchorStart.x,
                    placeToTopY: element.anchorStart.y,
                    width: 0,
                    height: 0,
                };

                //for updating the anchor
                newElement = {
                    ...element,
                    anchorStart: {
                        ...element.anchorStart,
                        ...element.anchorStart,
                        x: element.anchorStart.x - (element.offsetX - x),
                        y: element.anchorStart.y - (element.offsetY - y),

                    }
                };

            } else {
                //for updating the arrow, he is listening to dragState
                newDragElement = {
                    elementType: "arrowAnchor" + location,
                    ID: "dragEnd" + props.arrow._id!,
                    placeToLeftX: element.anchorEnd.x,
                    placeToTopY: element.anchorEnd.y,
                    width: 0,
                    height: 0,
                };

                //for updating the anchor
                newElement = {
                    ...element,
                    anchorEnd: {
                        ...element.anchorEnd,
                        x: element.anchorEnd.x - (element.offsetX - x),
                        y: element.anchorEnd.y - (element.offsetY - y),
                    }
                }
            };


            dispatch(setActiveDragElement(newDragElement))
            setElement(newElement);

        }
    }



    const handlePointerUp = async (event: React.PointerEvent<SVGElement>, location: string) => {
        let newElement: DragElement;
        newElement = { ...element, active: false, offsetX: -1, offsetY: -1 };
        setElement(newElement);


        console.log("overCardState", overCardState)

        //write down the anchor for the arrows, overCardState can be "" or "_id"
        if (location === "Start") {
            dispatch(setArrowInside({
                ...element,
                anchorStart: {
                    ...element.anchorStart,
                    onCard: overCardState.cardID.toString(),
                    x: element.anchorStart.x,
                    y: element.anchorStart.y,

                }
            }));
        } else {
            dispatch(setArrowInside({
                ...element,
                anchorEnd: {
                    ...element.anchorEnd,
                    onCard: overCardState.cardID.toString(),
                    x: element.anchorEnd.x,
                    y: element.anchorEnd.y,

                }
            }));
        }


        //set links inside selected board
        if (overCardState.cardID !== "") {
            const toDraggedBoard = allBoards!.filter(board => board._id! === overCardState.cardID);
            console.log("toDraggedBoard", toDraggedBoard)
            const boardName = toDraggedBoard[0].boardName;
            let completeToDraggedBoard: Board;
            completeToDraggedBoard = await dispatch(fetchBoardById(toDraggedBoard[0]._id!)).unwrap()
            // console.log("completeToDraggedBoard", completeToDraggedBoard)


            let ifArrowHasSecondAnchorBoard = allBoards!.filter(board =>
                board.linkList.some(link => link.fromArrowID === props.arrow._id)
            );

            //if the anchor from arrow is the second one
            if (ifArrowHasSecondAnchorBoard[0]) {
                //call the second board
                let completeSecondBoard: Board;
                completeSecondBoard = await dispatch(fetchBoardById(ifArrowHasSecondAnchorBoard[0]._id!)).unwrap()

                console.log("completeSecondBoard", completeSecondBoard)
                let link = completeSecondBoard.linkList.filter(link => link.fromArrowID === props.arrow._id)
                console.log("link", link)
                console.log("linkid", link[0].toID)

                if (location === "Start") {

                    const newLink1 = {
                        fromArrowID: props.arrow._id!,
                        isFromBoard: false,
                        fromID: overCardState.cardID.toString(),
                        toID: link[0].toID,
                        linkPosition: {
                            x: 200,
                            y: 500
                        }
                    }
                    //append link to second board
                    const updatedBoard = {
                        ...completeSecondBoard, // Kopiere alle anderen Eigenschaften des Boards
                        linkList: completeSecondBoard.linkList.filter(link => link.fromArrowID !== props.arrow._id).concat(newLink1)
                    };
                    console.log("updatedBoard start", updatedBoard)
                    await dispatch(updateBoardInDb(updatedBoard))
                    dispatch(setBoard(updatedBoard))

                    const newLink2 = {
                        fromArrowID: props.arrow._id!,
                        isFromBoard: true,
                        fromID: overCardState.cardID.toString(),
                        toID: link[0].toID,
                        linkPosition: {
                            x: 200,
                            y: 500
                        }
                    }
                    //append link to dragged board
                    completeToDraggedBoard.linkList = completeToDraggedBoard.linkList.filter(link => link.fromArrowID !== props.arrow._id)
                    completeToDraggedBoard.linkList = completeToDraggedBoard.linkList.concat(newLink2)
                    await dispatch(updateBoardInDb(completeToDraggedBoard))
                    dispatch(setBoard(completeToDraggedBoard))

                    //(fetchAllBoards())






                    //else if location is "End"
                } else {
                    const newLink1 = {
                        fromArrowID: props.arrow._id!,
                        isFromBoard: true,
                        fromID: link[0].fromID,
                        toID: overCardState.cardID.toString(),
                        linkPosition: {
                            x: 200,
                            y: 500
                        }
                    }
                    //append link to second board
                    const updatedBoard = {
                        ...completeSecondBoard, // Kopiere alle anderen Eigenschaften des Boards
                        linkList: completeSecondBoard.linkList.filter(link => link.fromArrowID !== props.arrow._id).concat(newLink1)
                    };
                    console.log("updatedBoard end", updatedBoard)
                    dispatch(updateBoardInDb(updatedBoard))
                    dispatch(setBoard(updatedBoard))

                    const newLink2 = {
                        fromArrowID: props.arrow._id!,
                        isFromBoard: false,
                        fromID: link[0].fromID,
                        toID: overCardState.cardID.toString(),
                        linkPosition: {
                            x: 200,
                            y: 500
                        }
                    }
                    //append link to dragged board
                    completeToDraggedBoard.linkList = completeToDraggedBoard.linkList.filter(link => link.fromArrowID !== props.arrow._id)
                    completeToDraggedBoard.linkList = completeToDraggedBoard.linkList.concat(newLink2)
                    dispatch(updateBoardInDb(completeToDraggedBoard))
                    dispatch(setBoard(completeToDraggedBoard))
                    //dispatch(fetchAllBoards())
                }



                //else if the arrow drags with his first anchor
            } else {
                if (location === "Start") {
                    const newLink = {
                        fromArrowID: props.arrow._id!,
                        isFromBoard: true,
                        fromID: overCardState.cardID.toString(),
                        toID: "",
                        linkPosition: {
                            x: 200,
                            y: 500
                        }
                    }
                    completeToDraggedBoard.linkList = completeToDraggedBoard.linkList.concat(newLink)
                    console.log("completeToDraggedBoard start", completeToDraggedBoard)
                    dispatch(updateBoardInDb(completeToDraggedBoard))
                    dispatch(setBoard(completeToDraggedBoard))
                    //dispatch(fetchAllBoards())
                    //else if location is "End"
                } else {
                    const newLink = {
                        fromArrowID: props.arrow._id!,
                        isFromBoard: false,
                        fromID: "",
                        toID: overCardState.cardID.toString(),
                        linkPosition: {
                            x: 200,
                            y: 500
                        }
                    }
                    completeToDraggedBoard.linkList = completeToDraggedBoard.linkList.concat(newLink)
                    console.log("completeToDraggedBoard end", completeToDraggedBoard)
                    dispatch(updateBoardInDb(completeToDraggedBoard))
                    dispatch(setBoard(completeToDraggedBoard))
                    //dispatch(fetchAllBoards())
                }
            }
        }

        dispatch(updateArrowInDb(element._id!))
        dispatch(removeOverCard())

    }




    return (
        <>
            <g
            >
                <circle
                    r="6"
                    cx={element.anchorStart.x}
                    cy={element.anchorStart.y}
                    fill='#3399ff'
                    stroke='white'
                    strokeWidth='1'
                    className='focusPoints'
                    onPointerDown={event => handlePointerDown(event, "Start")}
                    onPointerMove={event => handlePointerMove(event, "Start")}
                    onPointerUp={event => handlePointerUp(event, "Start")}
                >
                </circle>

                <circle
                    r="6"
                    cx={element.anchorEnd.x}
                    cy={element.anchorEnd.y}
                    fill='#3399ff'
                    stroke='white'
                    strokeWidth='1'
                    className='focusPoints'
                    onPointerDown={event => handlePointerDown(event, "End")}
                    onPointerMove={event => handlePointerMove(event, "End")}
                    onPointerUp={event => handlePointerUp(event, "End")}
                >

                </circle>




            </g>
        </>
    );
};

