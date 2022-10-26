import { FunctionComponent } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { successMsg } from "../services/feedbacksService";
import { getIsBiz } from "../services/usersService";

interface NavbarProps {}

const Navbar: FunctionComponent<NavbarProps> = () => {
  const navigate=useNavigate()
  const handleLogout=()=>{
    sessionStorage.removeItem("token")
    successMsg("you logged out!bye bye:)");
    navigate("/")
    window.location.reload();
}
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-2 fs-4">
        <div className="container">
          <NavLink className="navbar-brand" to={"/"}>
          <img  src="images/logo2.png" width="150px"/>

          </NavLink>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mb-2 mb-lg-0 mx-auto">
              <li className="nav-item">
                <NavLink
                  className="nav-link m-2"
                  aria-current="page"
                  to={"/about"}
                >
                  About
                </NavLink>
              </li>
              {sessionStorage.getItem("token") ? (
                getIsBiz()?( <li className="nav-item">
                  <NavLink
                    className="nav-link m-2"
                    aria-current="page"
                    to={"/NewCard"}
                  >
                    New Card
                  </NavLink>
                </li>):null
               
              ) : (
                <li className="nav-item">
                  <NavLink
                    className="nav-link m-2"
                    aria-current="page"
                    to={"/login"}
                  >
                    Sign in
                  </NavLink>
                </li>
              ) }


              {sessionStorage.getItem("token") ? (
                getIsBiz()?( <li className="nav-item">
                  <NavLink
                    className="nav-link m-2"
                    aria-current="page"
                    to={"/MyCards"}
                  >
                    My Cards
                  </NavLink>
                </li>):null
               
              ) : (
                <li className="nav-item">
                  <NavLink
                    className="nav-link m-2"
                    aria-current="page"
                    to={"/register"}
                    >
                      Sign up
                  </NavLink>
                </li>
              ) }
              


              {sessionStorage.getItem("token") ? (
                <li className="nav-item m-2">
                  <NavLink
                    className="nav-link"
                    aria-current="page"
                    to={"/AllCards"}
                  >
                    All Cards
                  </NavLink>
                </li>
              ) : (
                <li className="nav-item m-2">
                  <NavLink
                    className="nav-link"
                    aria-current="page"
                    to={"/business"}
                  >
                    Business
                  </NavLink>
                </li>
              )}

              {sessionStorage.getItem("token") ? (
                <button onClick={handleLogout} className="btn btn-outline-primary mx-5" type="submit">
              logout
            </button>
              ) : null}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
