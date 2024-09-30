import { Outlet, Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from "react"

import "./buttons/buttons.css"

import { useAppDispatch, useAppSelector } from "./app/hooks"
import { updateBoardInDb } from "./pages/single-board/singleBoardSlice"
import { setNavigationToHome, setNavigationToSingleBoard, setNavigationToMultiBoard } from "./navigationSlice"



import { Board } from './app/fetch-data/dataTypes'




const Layout = () => {
  const dispatch = useAppDispatch()
  let data = useAppSelector(state => state.singleBoard.board)

  const location = useLocation();
  const boardId = location.pathname.split('/').pop() || 'IdNotDefined';

  const navigation = useAppSelector(state => state.navigation.nav)

  const [isMultiButtonOn, setIsMultiButtonOn] = useState<boolean>(
    false
  );

  const saveDBBoard = (event: React.PointerEvent<HTMLButtonElement>, id: string) => {

    dispatch(updateBoardInDb(data!));

  }

  const changeToHome = () => {
    dispatch(setNavigationToHome())
  }

  const bricksButton = () => {
    dispatch(setNavigationToHome())
    setIsMultiButtonOn(false)
  }

  const multiButton = () => {
    dispatch(setNavigationToMultiBoard())
    setIsMultiButtonOn(true)
  }

  return (
    <>
      <nav>
        <ul className="ul-general">
          <li className="li-buttons">
            <button className={'button-general'}
              onPointerUp={changeToHome}>
              <Link className="link" to="/">Home</Link>
            </button>


            <div className={'button-group'}> </div>
            {navigation === "single-board" &&
              <>
                <button className={'button-general'}
                  onPointerUp={(event) => saveDBBoard(event, boardId)}
                >
                  save Board
                </button>
                <div className={'button-group'}> </div>
              </>}

            {(navigation === "home" || navigation=== "multi-board") &&
              <>
                <button
                  className={isMultiButtonOn === true ? 'button-radio-inactive' : 'button-radio-active'}
                  onPointerUp={bricksButton}

                >
                  bricks
                </button>
                <button
                  className={isMultiButtonOn === false ? 'button-radio-inactive' : 'button-radio-active'}
                  onPointerUp={multiButton}
                >
                  multi board
                </button>
              </>
            }

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