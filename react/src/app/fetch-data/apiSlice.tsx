import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

//const DOGS_API_KEY = 'some-kryptic-string';


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

//api is in singleBoardSLice
 export const boardsApiSlice = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://localhost:5100/api',
		prepareHeaders(headers) {
			//headers.set('x-api-key', DOGS_API_KEY);
			return headers;
		}
	}),

	endpoints: (builder) => ({
		//  GET-endpoint
		fetchBoards: builder.query<Board[], number | void>({
			query: (arg = 0) => '/boards/',//query(arg = 0) {	return '/boards/';	}
		}),
		//  GET-endpoint
		// fetchSingleBoard: builder.query<Board, string>({
		// 	query: (boardId = 'IdNotDefined') => '/boards/' + boardId,
		// }),
		// POST-endpoint
		// addBoard: builder.mutation<Board, Partial<Board>>({
		// 	query: (newBoard) => ({
		// 		url: '/boards/',
		// 		method: 'POST',
		// 		body: newBoard,
		// 	}),
		// }),
		// PUT-Endpunkt, // The mutation accepts a `Partial<Board>`(all args are optional) arg, and returns a `Board`
		// updateBoard: builder.mutation<Board, Partial<Board>>({
		// 	query: (updatedBoard) => ({
		// 		url: `/boards/${updatedBoard._id}`,
		// 		method: 'PUT',
		// 		body: updatedBoard,
		// 	}),
		// }),
	})
})

export const { useFetchBoardsQuery  } = boardsApiSlice
export default boardsApiSlice;