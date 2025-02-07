import React, { useState } from "react";
import states from "../data/states.json";
import "../style/LoginRegister.css";
import "../style/Button.css";
import register from "../image/register.jpg";
import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";
import { Link } from "react-router-dom";
import bcrypt from "bcryptjs";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [email, setEmail] = useState("");
  const [invalidEmail, setInvalidEmail] = useState(false);

  const [state, setState] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [message, setMessage] = useState("");

  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(eyeOff);

  const apiUrl =
    "http://969100-petpal-userservice-env.eba-dgjhss32.us-east-2.elasticbeanstalk.com";

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      // hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = {
        email: email,
        first_name: firstName,
        last_name: lastName,
        password: hashedPassword,
        location: state,
        role: role,
      };

      fetch(apiUrl + "/api/UserService/getUserByEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: email,
      })
        .then((response) => response.json())
        .then((exists) => {
          // If user exists, set appropriate message and return
          if (exists) {
            setMessage("User with that email already exists.");
            return;
          }

          // If user does not exist, proceed with user creation
          fetch(apiUrl + "/api/UserService/createUser", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newUser),
          })
            .then((response) => response.json())
            .then((data) => {
              setMessage("Registration successful!");
            })
            .catch(() => setMessage("Registration failed!"));
        })
        .catch((error) => console.log(error));
    } catch (error) {
      console.log("HASH ERROR: " + error);
    }
  };

  const handleToggle = () => {
    if (type === "password") {
      setIcon(eye);
      setType("text");
    } else {
      setIcon(eyeOff);
      setType("password");
    }
  };

  const validateEmail = (input) => {
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    setInvalidEmail(input.match(regex) ? false : true);
  };

  return (
    <section id="form">
      <div className="container" id="container">
        <div className="form-container log-in-container">
          <form className="login-register-form" onSubmit={handleRegister}>
            <h1 className="login-register-h1">Register</h1>

            <input
              className="form-control"
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />

            <input
              className="form-control"
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />

            <input
              className={`form-control ${
                email && invalidEmail && "border-danger"
              }`}
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                validateEmail(e.target.value);
              }}
            />

            <div className="register-password-container">
              <input
                className="form-control"
                type={type}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />

              <span
                className="login-register-span input-group-append"
                onClick={handleToggle}
              >
                <Icon icon={icon} size={25} />
              </span>
            </div>

            <select
              className="form-control"
              placeholder={"State"}
              value={state}
              onChange={(e) => setState(e.target.value)}
            >
              <option value="" defaultValue={true} disabled hidden>
                Select State
              </option>
              {states.map((state) => (
                <option key={state.code} value={state.code}>
                  {state.name}
                </option>
              ))}
            </select>

            <div className="adopt-rehome-container">
              <input
                type="radio"
                name="role"
                id="adopt"
                checked={role === "Adopter"}
                onChange={() => setRole("Adopter")}
              ></input>
              <label htmlFor="Adopter">Adopt</label>
              <input
                type="radio"
                name="role"
                id="rehome"
                checked={role === "Rehomer"}
                onChange={() => setRole("Rehomer")}
              ></input>
              <label htmlFor="Rehomer">Rehome</label>
            </div>
            {message && (
              <p
                className="login-register-status-message"
                style={{
                  color:
                    message === "Registration successful!" ? "#007bff" : "red",
                }}
              >
                {message}
              </p>
            )}
            <button
              className="button-petpal-primary"
              disabled={
                !firstName ||
                !lastName ||
                !email ||
                !state ||
                !password ||
                !role ||
                invalidEmail
              }
            >
              Register
            </button>
            <span className="login-register-span">
              Already registered? &nbsp;
              <Link className="login-link" to="/login" exact="true">
                Sign In
              </Link>
            </span>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-right">
              <img src={register} alt="cat" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
