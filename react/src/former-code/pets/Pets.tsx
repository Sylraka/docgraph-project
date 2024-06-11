import { useState } from "react"
import { useFetchBoardsQuery } from "../../app/fetch-data/apiSlice"
import { useNavigate } from 'react-router-dom';


export const Pets = () => {
  const navigate = useNavigate();
  // Using a query hook automatically fetches data and returns query values
  const { data, isError, isLoading, isSuccess } = useFetchBoardsQuery();


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
      <div >
        <h3>Here are your animals!</h3>
        {data.map(({ _id, boardName }) => (
          <blockquote key={_id}>
            &ldquo;{boardName}&rdquo;
          </blockquote>
        ))}


        <button onClick={() => navigate('/')}>
          go to home
        </button>
      </div>
    )
  }

  return null
}
