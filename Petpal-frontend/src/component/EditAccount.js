import states from "../data/states.json";
import { useNavigate } from "react-router-dom";
import React, { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import "../style/EditAccount.css";
import "../style/Button.css";
import roles from "../data/roles.json";

const EditAccount = () => {
  const { user, setUser } = useContext(AuthContext);

  const [firstName, setFirstName] = useState(user.first_name);
  const [lastName, setLastName] = useState(user.last_name);
  const [email, setEmail] = useState(user.email);
  const [state, setState] = useState(user.location);
  const [role, setRole] = useState(user.role);

  const navigate = useNavigate();

  const apiUrl =
    "http://969100-petpal-userservice-env.eba-dgjhss32.us-east-2.elasticbeanstalk.com";

  function handleMessage(e) {
    e.preventDefault();
    if (!firstName) {
      window.alert("Please make sure first name is filled out.");
    } else if (!lastName) {
      window.alert("Please make sure last name is filled out.");
    }
  }

  function handleSave(e) {
    e.preventDefault();
    const updatedUser = {
      email: email,
      first_name: firstName,
      last_name: lastName,
      location: state,
      role: role,
    };

    fetch(`${apiUrl}/api/UserService/updateUserById/${user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUser),
    })
      .then((response) => response.json())
      .then((user) => {
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
        navigate("/myaccount");
      })
      .catch((error) => console.log(error));
  }

  return (
    <form onSubmit={!firstName || !lastName ? handleMessage : handleSave}>
      <div className="head">
        <h1>Edit Profile</h1>
      </div>
      <div className="card-edit">
        <div
          className="form-group edit-account-input"
          style={{ marginTop: "1rem" }}
        >
          <label htmlFor="firstName">First Name</label>
          <input
            className="form-control"
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>

        <div className="form-group edit-account-input">
          <label htmlFor="lastName">Last Name</label>
          <input
            className="form-control"
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <div className="form-group edit-account-input">
          <label htmlFor="email">Email</label>
          <input
            className="form-control"
            type="text"
            id="email"
            value={email}
            disabled={true}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group edit-account-input">
          <label htmlFor="location">Location</label>
          <select
            className="form-control"
            id="location"
            value={state}
            onChange={(e) => setState(e.target.value)}
          >
            {states.map((state) => (
              <option key={state.code} value={state.code}>
                {state.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group edit-account-input">
          <label htmlFor="role">Role</label>
          <select
            className="form-control"
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            {roles.map((role) => (
              <option key={role.id} value={role.name}>
                {role.name}
              </option>
            ))}
          </select>
        </div>

        <button
          className="button-petpal-primary"
          style={{ marginTop: "0.5rem", marginBottom: "1rem" }}
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default EditAccount;
