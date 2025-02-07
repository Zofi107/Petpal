import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import "../style/Navbar.css";
import AuthContext from "../context/AuthContext";

export default function Navbar() {
  const { isLoggedIn, setIsLoggedIn, user, setUser } = useContext(AuthContext);
  const location = useLocation();

  function handleLogout(e) {
    e.preventDefault();
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");
    setUser(null);
    setIsLoggedIn(false);
  }

  return (
    <nav className="nav">
      <div className="nav-inner">
        <Link className="nav-header nav-link" to="/">
          <h1 className="nav-link-text nav-title">Petpal</h1>
        </Link>

        {isLoggedIn && user.role === "Adopter" && (
          <Link className="nav-link" to="/home">
            <h1
              className={`nav-link-text ${
                location.pathname === "/home" && "nav-link-text-active"
              }`}
            >
              Find Pets
            </h1>
          </Link>
        )}

        {isLoggedIn && user.role === "Adopter" && (
          <Link className="nav-link" to="/likes">
            <h1
              className={`nav-link-text ${
                location.pathname === "/likes" && "nav-link-text-active"
              }`}
            >
              Likes
            </h1>
          </Link>
        )}

        {isLoggedIn && (
          <Link className="nav-link" to="/myaccount">
            <h1
              className={`nav-link-text ${
                (location.pathname === "/myaccount" ||
                  location.pathname === "/editaccount" ||
                  location.pathname === "/editpet" ||
                  location.pathname === "/addpet" ||
                  location.pathname === "/editpreference") &&
                "nav-link-text-active"
              }`}
            >
              Profile
            </h1>
          </Link>
        )}

        {isLoggedIn ? (
          <Link
            className="nav-link nav-sign-out-link"
            to="/"
            onClick={handleLogout}
          >
            <h1 className="nav-link-text">Sign Out</h1>
          </Link>
        ) : (
          <>
            <Link className="nav-link" to="/about">
              <h1
                className={`nav-link-text ${
                  (location.pathname === "/about" ||
                    location.pathname === "/") &&
                  "nav-link-text-active"
                }`}
              >
                About
              </h1>
            </Link>
            <Link className="nav-link" to="/login">
              <h1
                className={`nav-link-text ${
                  (location.pathname === "/login" ||
                    location.pathname === "/register") &&
                  "nav-link-text-active"
                }`}
              >
                Sign In
              </h1>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
