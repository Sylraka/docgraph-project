import { Outlet, Link } from "react-router-dom";
import "./pages/single-board/nav-bars/buttons/buttons.css"

import { useAppDispatch, useAppSelector} from "./app/hooks"
import {updateBoardInDb} from "./pages/single-board/singleBoardSlice"
import { useLocation } from 'react-router-dom';

import { Board } from './app/fetch-data/dataTypes'




const Layout = () => {
  const dispatch = useAppDispatch()
  let data = useAppSelector(state => state.singleBoard.board)

  const location = useLocation();
  const boardId = location.pathname.split('/').pop() || 'IdNotDefined';
  // console.log(boardId)


  const saveDBBoard = (event:React.PointerEvent<HTMLButtonElement> , id: string) => {
    
    dispatch(updateBoardInDb(data!));

  }


  return (
    <>
      <nav>
        <ul className="ul-general">
          <li className="li-buttons">
            <button className={'button-general'}>
            <Link className="link" to="/">Home</Link>
            </button>
            <button className={'button-general'}
            onPointerUp={(event) => saveDBBoard(event, boardId)}
            >
            save Board
            </button>
            
          </li>
          {/* <li>
            <Link to="/contact">contact</Link>
          </li> */}
        </ul>
      </nav>

      <Outlet />
    </>
  )
};


// <button onClick={() => navigate('/')}>
// go to home
// </button>

export default Layout;