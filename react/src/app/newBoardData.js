import { Card, Board, Arrow } from './fetch-data/dataTypes';


export const newBoardData = {
    boardName: 'Boardname',
    boardType: '',
    boardPosition: {
        x: 0,
        y: 0
    },
    cardList: [
        {
            cardID: 1,
            cardTypes: ['primitive'],
     //       canvasNumber: 1,
            text: "your text",
            x: 1,
            y: 1,
            width: 200,
            height: 100,
            math: {
                mathText:"mathText",
                height: 100
            }
        },
        {
            cardID: 2,
            cardTypes: ['primitive'],
       //     canvasNumber: 2,
            text: "your text",
            x: 1,
            y: 1,
            width: 200,
            height: 100,
            math: {
                mathText:"mathText",
                height: 100
            }
        }
    ],
    arrowList: [
        {
            arrowID: 1,
            arrowTypes: ['oneHead'],
            anchorStart: {
                anchorID: 1,
                onCard: 1, //-1==noCard
                anchorCanvas: {
     //               canvasNumber: 1,
                    x: 100,
                    y: 300
                },
            },
            anchorEnd: {
                anchorID: 2,
                onCard: 1, //ID of card
                anchorCanvas: {
         //           canvasNumber: 1,
                    x: 100,
                    y: 200
                },
            }
        }
    ],
    cardIDCounter: 3,
    arrowIDCounter: 2,
    anchorIDCounter: 3
}