import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import "./general-styles.css"
import { Pets } from "./former-code/pets/Pets"
import { Home } from "./pages/home"
import { SingleBoard } from "./pages/single-board/board"
import Layout from "./horizontal-nav"
import { MathJaxContext } from "better-react-mathjax";
import {MultiBoard} from "./pages/multi-board/multiBoard"

//show for routing: https://www.dhiwise.com/post/understanding-and-implementing-react-router-middleware
const App = () => {


  return (
    <>
      <MathJaxContext
        version={2}
      >
        <div className="App">

          <Router>
            <Routes> {/* place the one component the route fits */}
              <Route path="/" element={<Layout />} >
                <Route index element={<Home />} />
                <Route path="/:collection" element={<MultiBoard/>}/>
                <Route path="/:collection/:id" element={<SingleBoard />} />
              </Route>
            </Routes>
          </Router>

        </div>
      </MathJaxContext>
    </>
  )
}

export default App
