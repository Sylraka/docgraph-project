import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

//const DOGS_API_KEY = 'some-kryptic-string';

interface Card {
	number: number;
	animal: string;

}

export const apiSlice = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://localhost:5100/',
		prepareHeaders(headers) {
			//headers.set('x-api-key', DOGS_API_KEY);
			return headers;
		}
	}),
	endpoints(builder) { 
		return {
		fetchCards: builder.query<Card[], number|void> ({
			 query() {
				return '/cards'
				}
			})
		}
	}
	 
})

export const { useFetchCardsQuery } = apiSlice