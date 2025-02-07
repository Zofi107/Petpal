import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../style/Account.css";
import "../style/Button.css";
import AuthContext from "../context/AuthContext";
import Adopter from "./Adopter";
import Rehomer from "./Rehomer";
const Account = () => {
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();
  return (
    <div className="full-container">
      <div className="account-part">
        <div className="button-and-label-container">
          <h2>My Profile</h2>
          <button
            className="button-petpal-primary"
            onClick={() => {
              navigate("/editaccount");
            }}
          >
            Edit
          </button>
        </div>
        <div className="cardAcc">
          <div>
            <label className="user-detail-container">
              First Name: {user.first_name}
            </label>

            <br></br>
            <label className="user-detail-container">
              Last Name: {user.last_name}
            </label>

            <br></br>
            <label className="user-detail-container">Email: {user.email}</label>

            <br></br>
            <label className="user-detail-container">
              State: {user.location}
            </label>

            <br />
            <label className="user-detail-container">Role: {user.role}</label>
          </div>
        </div>
      </div>

      {user.role === "Rehomer" ? <Rehomer /> : <Adopter />}
    </div>
  );
};

export default Account;
