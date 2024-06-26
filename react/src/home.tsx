import { useState, useEffect, Key } from "react";
import { Link } from "react-router-dom";

import { useNavigate } from 'react-router-dom';
import { useFetchBoardsQuery } from "./app/fetch-data/apiSlice"

import "./general-styles/general-styles.css"

export const Home = () => {
    const navigate = useNavigate();

    return (
        <div className='background'>
            <div className='placeholder-1'></div>
            <button onClick={() => navigate('/pets')}>
                Go to testdata with pets
            </button>



            <div className="row" id="content">
                <header className="border-horizontal">
                    <h1>You're Welcome</h1>
                    <p>find your information in the bricks</p>
                </header>
                <main className="flex-wrapper border-horizontal">
                    <div className="brick flex-content">
                        {/*<Link to={"/board/generateNewBoard"} className="brick-content">
                            neues Board
                            <br /><br /><br />
                            <p className="plus">+</p>
                        </Link>*/}

                    </div>
                </main >



                <h4>saved Bricks</h4>
                <div className="buttonbar-wrapper">
                    {/* <DropdownButton labels={['id', 'x']} clickElem={changeSort} />*/}
                </div>
                <div className="flex-wrapper">
                    <SavedBoards sortBy={0} />
                </div>

            </div>



        </div>
    );
}




const SavedBoards = (props: { sortBy: number }) => {
    // Using a query hook automatically fetches data and returns query values
    const { data, isError, isLoading, isSuccess } = useFetchBoardsQuery()

    /**
    useEffect(() => {
        getAllBoards().then(data => {
            console.log(data)

            switch (props.sortBy) {
                case sortLabels.label1:
                    //thats for string
                    data.sort((a, b) => a._id > b._id ? 1 : -1)
                    break;
                case sortLabels.label2:
                    //thats for int
                    data.sort((a, b) => a.boardPosition.x - b.boardPosition.x)
                    break;
                default:
                    console.error("sort by ", props.sortBy, " is not possible!");
                    break;
            }

            setAllBoards({
                boardList: data
            })
        })
    }, [props.sortBy]);
    */
    if (isError) {
        return (
            <div>
                <h1>There was an error!!!</h1>
            </div>
        )
    }

    if (isLoading) {
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        )
    }

    if (isSuccess) {
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
}

  /** 
        {data.map(({ _id, boardName }) => (
          <blockquote key={_id}>
            &ldquo;{boardName}&rdquo;
          </blockquote>
        ))}
         */