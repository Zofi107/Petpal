import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { Link } from "react-router-dom";
import "../style/LoginRegister.css";
import "../style/Button.css";
import login from "../image/login.jpg";

import bcrypt from "bcryptjs";

export default function Login() {
  const { setIsLoggedIn, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [invalidEmail, setInvalidEmail] = useState(false);

  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const apiUrl =
    "http://969100-petpal-userservice-env.eba-dgjhss32.us-east-2.elasticbeanstalk.com";

  function handleLogin(e) {
    e.preventDefault();

    fetch(apiUrl + "/api/UserService/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: email,
    })
      .then((response) => response.json())
      .then(async (user) => {
        if (user) {
          const matched = await bcrypt.compare(password, user.password);

          if (matched) {
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("isLoggedIn", "true");
            setUser(user);
            setIsLoggedIn(true);
            navigate("/myaccount");
          } else {
            setMessage("Incorrect password!");
          }
        } else {
          setMessage("Login failed!");
        }
      })
      .catch(() => setMessage("Login failed!"));
  }

  const validateEmail = (emailInput) => {
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    setInvalidEmail(emailInput.match(regex) ? false : true);
  };

  return (
    <section id="form">
      <div className="container" id="container">
        <div className="form-container log-in-container">
          <form className="login-register-form">
            <h1 className="login-register-h1">Sign In</h1>
            <input
              className={`form-control ${
                email && invalidEmail && "border-danger"
              }`}
              type="text"
              value={email}
              placeholder="Email"
              onChange={(e) => {
                setEmail(e.target.value);
                validateEmail(e.target.value);
              }}
            />
            <input
              className="form-control"
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            {message && (
              <p
                className="login-register-status-message"
                style={{ color: "red", marginBottom: "0.5rem" }}
              >
                {message}
              </p>
            )}
            <button
              className="button-petpal-primary"
              disabled={!email || !password || invalidEmail}
              onClick={handleLogin}
              style={{ marginTop: "0.5rem" }}
            >
              Sign In
            </button>
            <br />
            <span className="login-register-span">
              Not registered? &nbsp;
              <Link className="login-link" to="/register" exact="true">
                Create an account
              </Link>
            </span>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-right">
              <img src={login} alt="dog" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
