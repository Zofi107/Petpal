import React, { useState } from "react";
import "../style/AddPet.css";
import "../style/Button.css";
import "../style/EditPet.css";
import { useLocation, useNavigate } from "react-router-dom";

export default function EditPet() {
  const location = useLocation();
  const data = location.state;
  const navigate = useNavigate();
  const [name, setName] = useState(data.aPet.name);
  const [age, setAge] = useState(data.aPet.age);
  const [neutered, setNeutered] = useState(data.aPet.neutered);
  const [description, setDescription] = useState(data.aPet.description);
  const [upToDate, setUpToDate] = useState(data.aPet.up_to_date);

  const apiUrl =
    "http://969101-petpal-spring-env-1.eba-ihkq2sap.us-east-2.elasticbeanstalk.com";

  function handleMessage(e) {
    e.preventDefault();
    if (!name) {
      window.alert("Please make sure the name field is filled out.");
    } else if (!age) {
      window.alert("Please make sure the age field is filled out.");
    } else if (isNaN(age)) {
      window.alert("Please make sure the age is a number.");
    } else if (age < 0) {
      window.alert("Please make sure the age is a number above or equal to 0.");
    } else if (!description) {
      window.alert("Please make sure the description field is filled out.");
    }
  }

  function handleSave(e) {
    e.preventDefault();

    const updatedPet = {
      name: name,
      age: age,
      neutered: neutered,
      up_to_date: upToDate,
      description: description,
    };

    // console.log(updatedPet);

    fetch(`${apiUrl}/pets/updatePet/${data.aPet.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedPet),
    })
      .then((response) => response.json)
      .then((data) => {
        // console.log("Updated Pet");
        // console.log(data);
      })
      .catch((error) => {
        console.log("Error: " + error);
      });
    navigate("/myaccount");
    window.location.reload();
  }

  return (
    <div>
      <div className="edit-pet-container">
        <div className="image-delete-container">
          <img
            src={`data:image/jpg;base64, ${data.picture.image_data}`}
            className="pet-display-image"
            alt="pet"
            style={{
              width: "100%",
              marginRight: "1rem",
              marginLeft: "2rem",
              borderRadius: "0.5rem",
            }}
          />
        </div>
        <div className="form-group" style={{ marginBottom: "0px" }}>
          <label htmlFor="name">Name</label>
          <input
            className="add-pet-input form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-group" style={{ marginBottom: "0px" }}>
          <label htmlFor="age">Age</label>
          <input
            className="add-pet-input form-control"
            type="number"
            id="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          ></input>
        </div>

        <div className="form-group" style={{ marginBottom: "0px" }}>
          <label htmlFor="neutered">Neutered</label>
          <select
            className="add-pet-input form-control"
            id="neutered"
            value={neutered}
            onChange={(e) => setNeutered(e.target.value)}
          >
            <option id="yes" value="true">
              Yes
            </option>
            <option id="no" value="false">
              No
            </option>
          </select>
        </div>

        <div className="form-group" style={{ marginBottom: "0px" }}>
          <label htmlFor="type">Shots up to date</label>
          <select
            className="add-pet-input form-control"
            id="type"
            value={upToDate}
            onChange={(e) => setUpToDate(e.target.value)}
          >
            <option value="" disabled hidden>
              Choose an option
            </option>
            <option id="yes" value="true">
              Yes
            </option>
            <option id="no" value="false">
              No
            </option>
          </select>
        </div>

        <div className="form-group" style={{ marginBottom: "0px" }}>
          <label htmlFor="description">Description</label>
          <textarea
            className="add-pet-input form-control"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        <div
          className="add-pet-save-cancel-container"
          style={{ marginTop: "1rem" }}
        >
          <button
            className="button-petpal-secondary"
            onClick={() => navigate("/myaccount")}
          >
            Cancel
          </button>
          <button
            className="button-petpal-primary"
            onClick={
              !name || !age || isNaN(age) || age < 0 || !description
                ? handleMessage
                : handleSave
            }
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
