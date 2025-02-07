import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../style/AddPet.css";
import "../style/Button.css";
import "../style/PersonalityBadge.css";
import AuthContext from "../context/AuthContext";
import typeData from "../data/types.json";
import traitData from "../data/Traits.json";
import dogBreeds from "../data/dogBreeds.json";
import catBreeds from "../data/catBreeds.json";
import PersonalityBadge from "./PersonalityBadge";

const breedData = {
  Dog: dogBreeds,
  Cat: catBreeds,
};

export default function AddPet() {
  const { user } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [picture, setPicture] = useState("");
  const [typeOptions, setTypeOptions] = useState([]);
  const [type, setType] = useState("");
  const [breedOptions, setBreedOptions] = useState([]);
  const [breed, setBreed] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [traits, setTraits] = useState([]);
  const [upToDate, setUpToDate] = useState("");
  const [neutered, setNeutered] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const navigate = useNavigate();

  const apiUrl =
    "http://969101-petpal-spring-env-1.eba-ihkq2sap.us-east-2.elasticbeanstalk.com";

  function handleTraitChange(trait) {
    setTraits(
      traits.map((t) =>
        t.name === trait.name ? { ...t, checked: !trait.checked } : t
      )
    );
  }

  useEffect(() => {
    if (file) {
      // for preview
      setImageUrl(URL.createObjectURL(file));

      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result.replace(/^data:.+;base64,/, "");
        setPicture(base64);
      };
      reader.onerror = (e) => {
        console.log(e);
      };
      reader.readAsDataURL(file);
    }
  }, [file]);

  function handleMessage(e) {
    e.preventDefault();

    if (!name) {
      window.alert("Please make sure the name field is filled out.");
    } else if (!picture) {
      window.alert("Please make sure a proper picture is selected.");
    } else if (!type) {
      window.alert("Please make sure the type of your pet is selected.");
    } else if (!breed) {
      window.alert("Please make sure the breed of your pet is selected.");
    } else if (!gender) {
      window.alert("Please make sure the gender field is selected.");
    } else if (!age) {
      window.alert("Please make sure the age field is filled out.");
    } else if (isNaN(age)) {
      window.alert("Please make sure the age field filled out is a number.");
    } else if (age < 0) {
      window.alert("Please make sure the age of your pet is correct.");
    } else if (neutered === "") {
      window.alert("Please make sure the neutered field is selected.");
    } else if (upToDate === "") {
      window.alert("Please make sure the shots up to date field is selected.");
    } else if (!description) {
      window.alert("Please make sure the description field is filled out.");
    }
  }

  function handleSave(e) {
    e.preventDefault();

    const id = user.id;

    const checkedTraits = traits
      .filter((trait) => trait.checked)
      .map((trait) => trait.name);

    const newPet = {
      owner_id: id,
      name: name,
      species: type,
      breed: breed,
      age: age,
      gender: gender,
      neutered: neutered,
      up_to_date: upToDate,
      description: description,
      traits: checkedTraits,
      image_data: picture,
    };

    fetch(apiUrl + "/pets/createPet", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPet),
    })
      .then((response) => response.json)
      .catch((error) => console.log(error));

    navigate("/myaccount");
    //window.location.reload();
  }

  useEffect(() => {
    setTypeOptions(typeData);
    setTraits(traitData.map((trait) => ({ name: trait, checked: false })));
  }, []);

  useEffect(() => {
    if (type === "Dog") {
      setBreedOptions(breedData.Dog);
    } else if (type === "Cat") {
      setBreedOptions(breedData.Cat);
    }
  }, [type]);

  return (
    <div className="add-pet-container">
      <div className="form-group" style={{ marginBottom: "0px" }}>
        <label htmlFor="name">Name</label>
        <input
          className="add-pet-input form-control"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div
        className="add-pet-picture-input-container"
        style={{ marginBottom: "0px" }}
      >
        <label htmlFor="picture">Picture</label>
        <input
          id="picture"
          accept="image/*"
          type="file"
          name="petImage"
          onChange={(e) => setFile(e.target.files[0])}
        />
      </div>

      {file && (
        <div className="add-pet-input-container">
          <div className="add-pet-input-container">
            <img alt="" height="200px" src={imageUrl} />
          </div>
        </div>
      )}

      <div className="form-group" style={{ marginBottom: "0px" }}>
        <label htmlFor="type">Type</label>
        <select
          className="add-pet-input form-control"
          id="type"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="" disabled hidden>
            Choose a type
          </option>
          {typeOptions.map((t) => (
            <option key={t} id={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group" style={{ marginBottom: "0px" }}>
        <label htmlFor="breed">Breed</label>
        <select
          className="add-pet-input form-control"
          id="breed"
          value={breed}
          disabled={!type}
          onChange={(e) => setBreed(e.target.value)}
        >
          <option value="" disabled hidden>
            Choose a breed
          </option>
          {breedOptions.map((b) => (
            <option key={b} id={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group" style={{ marginBottom: "0px" }}>
        <label htmlFor="type">Gender</label>
        <select
          className="add-pet-input form-control"
          id="type"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
          <option value="" disabled hidden>
            Choose a gender
          </option>
          <option id="male" value="Male">
            Male
          </option>
          <option id="female" value="Female">
            Female
          </option>
        </select>
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
        <label htmlFor="type">Neutered</label>
        <select
          className="add-pet-input form-control"
          id="type"
          value={neutered}
          onChange={(e) =>
            setNeutered(e.target.value === "true" ? true : false)
          }
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
        <label htmlFor="type">Shots up to date</label>
        <select
          className="add-pet-input form-control"
          id="type"
          value={upToDate}
          onChange={(e) =>
            setUpToDate(e.target.value === "true" ? true : false)
          }
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

      <p
        style={{
          margin: 0,
          color: "gray",
          fontSize: "small",
          fontStyle: "italic",
        }}
      >
        Click to select personality traits
      </p>
      <div className="add-pet-traits-container">
        {traits.map((trait) => (
          <PersonalityBadge
            key={trait.name}
            text={trait.name}
            disabled={!trait.checked}
            onClick={() => handleTraitChange(trait)}
          />
        ))}
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

      <div className="add-pet-save-cancel-container">
        <button
          className="button-petpal-secondary"
          onClick={() => navigate("/myAccount")}
        >
          Cancel
        </button>
        <button
          className="button-petpal-primary"
          onClick={
            !name ||
            !picture ||
            !type ||
            !breed ||
            !age ||
            isNaN(age) ||
            age < 0 ||
            !gender ||
            neutered === "" ||
            upToDate === "" ||
            !description
              ? handleMessage
              : handleSave
          }
        >
          Save
        </button>
      </div>
    </div>
  );
}
