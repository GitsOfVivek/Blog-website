import "./Header.scss";
import { NavLink } from "react-router-dom";
import { auth, provider } from "../../firebase";
import { signInWithPopup } from "firebase/auth";
import { useState, useContext } from "react";
import loading from "../../assets/loading.svg";
import UserContext from "../../context/UserContext";
import { FaBars, FaTimes } from "react-icons/fa";

const Header = () => {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const { isLoggedIn, setIsLoggedIn } = useContext(UserContext);
  const [isLogging, setIsLogging] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const handleLogIn = () => {
    setIsLogging(true);
    signInWithPopup(auth, provider)
      .then((data) => {
        setUserInfo(data.user);
        setIsLogging(false);
        setIsLoggedIn(true);
      })
      .catch((e) => {
        console.log(e);
        setIsLogging(false);
      });
  };

  return (
    <div className="header-wrapper">
      <header className="header">
        <NavLink className="logo" to="/">
          Blog Your Idea
        </NavLink>

        {/* Mobile Humburgur */}

        <div onClick={() => setIsNavOpen(!isNavOpen)} className="humburger">
          {!isNavOpen ? (
            <FaBars className="bars" />
          ) : (
            <FaTimes className="bars" />
          )}
        </div>

        {isNavOpen && (
          <div className="navigation-mob">
            <NavLink onClick={() => {
              setIsNavOpen(!isNavOpen)
            }} to={"/"}>Home</NavLink>
            <NavLink onClick={() => {
              setIsNavOpen(!isNavOpen)
            }} to={"/about"}>About</NavLink>
            <NavLink onClick={() => {
              setIsNavOpen(!isNavOpen)
            }} to={"/blogs"}>Blogs</NavLink>
            {isLoggedIn && <NavLink onClick={() => {
              setIsNavOpen(!isNavOpen)
            }} to={"/create-post"}>Create Post</NavLink>}
            {isLoggedIn ? (
              <NavLink onClick={() => {
                setIsNavOpen(!isNavOpen)
              }} to={"/profile"} className="btn-login">
                {userInfo?.displayName?.split(" ")[0]}
              </NavLink>
            ) : (
              <button onClick={handleLogIn}>
                {isLogging ? (
                  <img
                    style={{
                      height: "20px",
                      width: "20px",
                      margin: "0 10px",
                    }}
                    src={loading}
                  />
                ) : (
                  "Log In"
                )}
              </button>
            )}
          </div>
        )}

        <div className="nav-links">
          <NavLink
            className={({ isActive }) => (isActive ? "active" : "")}
            to="/about"
          >
            About
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? "active" : "")}
            to="/blogs"
          >
            Blogs
          </NavLink>
        </div>
        <div className="btns">
          {isLoggedIn && (
            <NavLink to={"/create-post"} className="btn-login">
              Create Post
            </NavLink>
          )}

          {isLoggedIn ? (
            <NavLink to={"/profile"} className="btn-login">
              {userInfo?.displayName?.split(" ")[0]}
            </NavLink>
          ) : (
            <button
              disabled={isLogging}
              onClick={handleLogIn}
              className="btn-login"
            >
              {isLogging ? (
                <img
                  style={{
                    height: "20px",
                    width: "20px",
                    margin: "0 10px",
                  }}
                  src={loading}
                />
              ) : (
                "Log In"
              )}
            </button>
          )}
        </div>
      </header>
    </div>
  );
};

export default Header;
