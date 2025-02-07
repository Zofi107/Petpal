import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../style/PetsDisplay.css";

function PetsDisplay() {
  const { user } = useContext(AuthContext);
  const [petData, setPetData] = useState([]);
  const [imageValid, setImageValid] = useState(false);
  const [loading, setLoading] = useState(true);

  const apiUrl =
    "http://969101-petpal-spring-env-1.eba-ihkq2sap.us-east-2.elasticbeanstalk.com";

  useEffect(() => {
    fetch(`${apiUrl}/pets/getPetsOfUser/${user.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data[data.length - 1].picture === null) {
          console.log("picture is null");
          console.log(data);
          setImageValid(!imageValid);
        } else {
          console.log("picture is not null");
          console.log(data);
          setPetData(data);
          setLoading(false);
        }
      })
      .catch((error) => console.log(error));
  }, [imageValid, user.id]);

  const handleDeletePet = (petId) => {
    fetch(`${apiUrl}/pets/deletePet/${petId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (response) => {
        setPetData(petData.filter((pet) => pet.aPet.id !== petId));
      })
      .catch((error) => console.log(error));
  };

  if (petData.length > 0) {
    return petData.map((data, index) => {
      return (
        <div key={data.aPet.id}>
          <PetDisplay
            className="pet-card"
            name={data.aPet.name}
            age={data.aPet.age}
            breed={data.aPet.breed}
            gender={data.aPet.gender}
            Fixed={data.aPet.neutered}
            up_to_date={data.aPet.up_to_date}
            desc={data.aPet.description}
            data={data}
            onDelete={() => handleDeletePet(data.aPet.id)}
          />
          {index + 1 === petData.length ? null : (
            <div className="line-divider" />
          )}
        </div>
      );
    });
  } else {
    return (
      <div>
        <p>Please add a Pet</p>
      </div>
    );
  }
}

function PetDisplay(props) {
  const navigate = useNavigate();
  const handleDelete = () => {
    props.onDelete();
  };
  return (
    <div className="pet-card-single">
      {props.data.picture && (
        <img
          src={`data:image/jpg;base64, ${props.data.picture.image_data}`}
          className="pet-display-image"
          alt="pet"
          style={{
            width: "30%",
            float: "left",
            marginRight: "1rem",
            borderRadius: "0.5rem",
          }}
        />
      )}

      <div className="pet-info">
        <h4>
          {props.name}, {props.age}
        </h4>
        <p>
          Breed: {props.breed}
          <br />
          Gender: {props.gender}
          <br />
          Neutered: {props.Fixed === true ? "Yes" : "No"}
          <br />
          Shots up to date: {props.up_to_date === true ? "Yes" : "No"}
        </p>
        <p>{props.desc}</p>
      </div>
      <div
        className="edit-delete-button"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          position: "absolute",
          right: "2.5%",
        }}
      >
        <button
          className="button-petpal-primary"
          onClick={() => {
            navigate("/editpet", { state: props.data });
          }}
        >
          Edit
        </button>

        <button className="button-petpal-secondary" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default PetsDisplay;
