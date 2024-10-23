export interface Card {
    // math: object;
    cardID: number;
    //canvasNumber: number;
    cardType: string;
    text: string;
    x: number;
    y: number;
    width: number;
    height: number;
}

export interface Arrow {
    arrowID: number;
    arrowTypes: string[];
    anchorStart: {
        anchorID: number;
        onCard: number;
        anchorCanvas: {
            //  canvasNumber: number;
            x: number;
            y: number;
        }
    };
    anchorEnd: {
        anchorID: number;
        onCard: number;
        anchorCanvas: {
            //    canvasNumber: number;
            x: number;
            y: number;
        }
    };
}

export interface Board {
    _id: string | undefined;
    boardName: string;
    boardRubrics: String[];
    boardPosition: {
        x: number,
        y: number
    };
    linkList: LinkCard[];
    cardList: Card[];
    arrowList: Arrow[];
    cardIDCounter: number;
    arrowIDCounter: number;
    anchorIDCounter: number;
    createdAt: string | undefined;
    updatedAt: string | undefined;
    __v: number | undefined;
}

export interface LinkCard {
    fromArrowID: string,
    isFromBoard: boolean,
    fromID: string,
    toID: string,
    linkPosition: {
        x: number,
        y: number
    }
}

export interface multiBoardArrow {
    _id: string | undefined;
    arrowType: string,
    anchorStart: {
        onCard: string,
        boardRubrics: string[],
        x: number,
        y: number
    },
    anchorEnd: {
        onCard: string,
        boardRubrics: string[],
        x: number,
        y: number
    }
    createdAt: string | undefined;
    updatedAt: string | undefined;
    __v: number | undefined;
}

export interface Collection {
    _id: string | undefined;
    collectionName: string;
    createdAt: string | undefined;
    updatedAt: string | undefined;
    __v: number | undefined;
}