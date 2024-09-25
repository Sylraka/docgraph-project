
import { Card, Board, Arrow } from './fetch-data/dataTypes';

export const newCardData: Card = {
    // math: {
    //     mathText: "mathText",
    //     height: 100
    // },
    cardID: -1,//are filled in rootBoards
    //canvasNumber: number;
    cardType: 'primitive',
    text: "your text",
    x: 1,
    y: 1,
    width: 200,
    height: 100

}
export const newCardMathData: Card = {
    // math: {
    //     mathText: "mathText",
    //     height: 100
    // },
    cardID: -1,//are filled in rootBoards
    //canvasNumber: number;
    cardType: 'math',
    text: "math text",
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
        onCard: -1,
        anchorCanvas: {
            //  canvasNumber: -1,
            x: 100,
            y: 300
        }
    },
    anchorEnd: {
        anchorID: -1,//are filled in rootBoards
        onCard: -1,
        anchorCanvas: {
            //     canvasNumber: -1,
            x: 100,
            y: 200
        }
    }

}