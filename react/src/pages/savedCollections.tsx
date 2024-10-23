import { useState, useEffect, Key } from "react";
import { Link } from "react-router-dom";

import { useNavigate } from 'react-router-dom';
import { fetchAllBoardsFromCollection } from "../app/fetch-data/allBoardsSlice"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { clearState } from "../app/fetch-data/singleBoardSlice"




export const SavedCollections = (props: { sortBy: number }) => {


    // Using a query hook automatically fetches data and returns query values
    //const { data, isError, isLoading, isSuccess } = useFetchBoardsQuery()
    let data = useAppSelector(state => state.collections.collections)
    console.log(data)
    return (
        <>
            {
                data?.map((collection) => (

                    <div key={collection._id} className="brick flex-content">
                        <Link to={{
                            pathname:  collection._id
                        }} className="brick-content">
                            {collection.collectionName}

                        </Link>

                    </div>

                ))
            }
        </>
    )

}