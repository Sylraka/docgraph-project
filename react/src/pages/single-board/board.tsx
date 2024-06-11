import { useEffect } from "react"
import { useFetchSingleBoardQuery } from "../../app/fetch-data/apiSlice"
import { useNavigate, useLocation } from 'react-router-dom';


export const Board = () => {
    const navigate = useNavigate();
    const location = useLocation();
    // Using a query hook automatically fetches data and returns query values
    //const { data, isError, isLoading, isSuccess } = useFetchBoardsQuery()

    // Extrahieren der Board-ID aus dem Pfad
    const boardId = location.pathname.split('/').pop() || 'IdNotDefined';

    const { data, isError, isLoading, isSuccess } = useFetchSingleBoardQuery(boardId);

    //  useEffect(() => {
    //     if (status === 'idle') {
    //       dispatch(fetchBoards());
    //     }
    //  }, [status, dispatch]);

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
       // console.log(data);
        return (
            <div >
                <h3>Here is one single board!</h3>
                <p> Name: {data.boardName}</p>
                <p>cardIDCounter: {data.cardIDCounter}</p>
                <h3>Here are Boards!</h3>
                {/** 
        {data.map(({ _id, boardName }) => (
          <blockquote key={_id}>
            &ldquo;{boardName}&rdquo;
          </blockquote>
        ))}
         */}


                <button onClick={() => navigate('/')}>
                    go to home
                </button>
            </div>
        )
    }

    return null
}
