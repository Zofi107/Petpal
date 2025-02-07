import React from "react";
import { useNavigate } from "react-router-dom";
import PetsDisplay from "./PetsDisplay";
import "../style/Account.css";

function Rehomer() {
  const navigate = useNavigate();

  return (
    <div className="pet-part">
      <div className="button-and-label-container">
        <h2 className="h1tag">My Pet(s)</h2>
        <button
          className="button-petpal-primary"
          onClick={() => {
            navigate("/addpet");
          }}
        >
          Add Pet
        </button>
      </div>
      <div className="cardPet">
        <PetsDisplay />
      </div>
    </div>
  );
}

export default Rehomer;
