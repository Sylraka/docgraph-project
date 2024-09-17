export interface Card {
	math: object;
	cardID: number;
	//canvasNumber: number;
	cardTypes: string[];
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
            canvasNumber: number;
            x: number;
            y: number;    
        }
    };
    anchorEnd: {
        anchorID: number;
        onCard: number;
        anchorCanvas: {
           canvasNumber: number;
            x: number;
            y: number;    
        }
    };
}

export interface Board {
	_id: string;
	boardName: string;
	boardType: string;
	boardPosition: object;
	cardList: Card[];
	arrowList: Arrow[];
	cardIDCounter: number;
	arrowIDCounter: number;
	anchorIDCounter: number;
	createdAt: string;
	updatedAt: string;
	__v: number;
}