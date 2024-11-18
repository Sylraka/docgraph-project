
import { Card, Board, Arrow, multiBoardArrow, LinkCard } from './fetch-data/dataTypes';

export const newCardData: Card = {
    cardID: -1,//are filled in rootBoards
    cardType: 'primitive',
    text: "your text",
    x: 1,
    y: 1,
    width: 200,
    height: 100

}
export const newCardMathData: Card = {
    cardID: -1,//are filled in rootBoards
    cardType: 'math',
    text: "math text",
    x: 1,
    y: 1,
    width: 200,
    height: 100

}

export const newCardCodeData: Card = {
    cardID: -1,//are filled in rootBoards
    cardType: 'code',
    text: "your code",
    x: 1,
    y: 1,
    width: 200,
    height: 100

}


export const newArrowData: Arrow = {
    arrowID: -1,//are filled in rootBoards
    arrowTypes: ['oneHead'],
    anchorStart: {
        anchorID: -1,//are filled in rootBoards
        onCard: "",
        anchorCanvas: {
            //  canvasNumber: -1,
            x: 100,
            y: 300
        }
    },
    anchorEnd: {
        anchorID: -1,//are filled in rootBoards
        onCard: "",
        anchorCanvas: {
            //     canvasNumber: -1,
            x: 100,
            y: 200
        }
    }

}

export const newMultiBoardArrowData = {
    arrowType: 'oneHead',
    anchorStart: {
        onCard: "",
        boardRubrics: [],
        x: 100,
        y: 300

    },
    anchorEnd: {
        onCard: "",
        boardRubrics: [],
        x: 100,
        y: 200

    }

}


export const CollectionData = {
    collectionName: "Enter Collection Name"
}

