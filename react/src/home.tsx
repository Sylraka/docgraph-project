import { useNavigate } from 'react-router-dom';

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
                  {/*  <SavedBoards sortBy={sortBy} />*/}
                </div>


            </div>




        </div>
    );
}
