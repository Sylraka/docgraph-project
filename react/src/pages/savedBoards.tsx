import { useState, useEffect, Key } from "react";
import { Link } from "react-router-dom";

import { useNavigate } from 'react-router-dom';
import { fetchAllBoards } from "../app/fetch-data/allBoardsSlice"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { clearState } from "./single-board/singleBoardSlice"




export const SavedBoards = (props: { sortBy: number }) => {


    // Using a query hook automatically fetches data and returns query values
    //const { data, isError, isLoading, isSuccess } = useFetchBoardsQuery()
    let data = useAppSelector(state => state.allBoards.boards)

    return (
        <>
            {
                data?.map((board: { _id: Key | null | undefined; boardName: string; }) => (

                    <div key={board._id} className="brick flex-content">
                        <Link to={{
                            pathname: "/board/" + board._id
                        }} className="brick-content">
                            {board.boardName}
                        </Link>

                    </div>

                ))
            }
        </>
    )

}