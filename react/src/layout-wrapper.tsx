import { Outlet, Link } from "react-router-dom";
import "./general-styles/buttons.css";

const Layout = () => {
  return (
    <>
      <nav>
        <ul className="ul-general">
          <li className="li-buttons">
            <button className={'button-general'}>
            <Link className="link" to="/">Home</Link>
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