import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../style/Account.css";
import typeData from "../data/types.json";
import dogBreeds from "../data/dogBreeds.json";
import catBreeds from "../data/catBreeds.json";
import AuthContext from "../context/AuthContext";

const breedData = {
  Dog: dogBreeds,
  Cat: catBreeds,
};
const ageRange = ["Baby (under 2 yo)", "Adult (2-7 yo)", "Senior (7+ yo)"];

function Preferences() {
  const { user } = useContext(AuthContext);
  const [preference, setPreference] = useState();
  const [preferenceNull, setPreferenceNull] = useState(true);
  const navigate = useNavigate();

  const apiUrl =
    "http://969100-petpal-preferenceservice-env-1.eba-p4mprkyy.us-east-2.elasticbeanstalk.com";

  //get preference if exist.
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `${apiUrl}/api/PreferenceService/getPreferenceByUserId/${user.id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not okay");
        }
        const data = await response.json();
        if (data) {
          setPreference(data);
          setPreferenceNull(false);
          // console.log(data)
        } else {
          // console.log("in else");
          setPreferenceNull(true);
        }
      } catch (error) {
        //if preference doesn't exist, do nothing
        // console.log("in catch");
        setPreferenceNull(true);
      }
    }
    fetchData();
  }, []);

  const [age, setAge] = useState("All Ages");
  const [breedOptions, setBreedOptions] = useState([]);
  const [breed, setBreed] = useState("All Breeds");
  const [gender, setGender] = useState("All Genders");
  const [neutered, setNeutered] = useState(false);
  const [ageOptions, setAgeOptions] = useState([]);
  const [typeOptions, setTypeOptions] = useState([]);
  const [type, setType] = useState("All Types");

  function handleSave(e) {
    e.preventDefault();

    //create preference object
    const preferenceDTO = {
      type: type,
      breed: breed,
      age: age,
      gender: gender,
      neutered: neutered,
    };
    // console.log("Sending:");
    // console.log(preferenceDTO);

    //if preference does not exist, create preference
    if (preferenceNull) {
      fetch(`${apiUrl}/api/PreferenceService/createPreference/${user.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(preferenceDTO),
      })
        .then((response) => response.json())
        .catch((error) => console.log(error));
      // console.log("created");
    } else {
      // preference exists
      fetch(
        `${apiUrl}/api/PreferenceService/updatePreferenceByUserId/${user.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(preferenceDTO),
        }
      )
        .then((response) => response.json())
        .catch((error) => console.log(error));
      // console.log("updated");
    }

    navigate("/myaccount");
    window.location.reload();
  }

  //loads preference if there exists a preference onto the component
  useEffect(() => {
    if (preference) {
      setAge(preference.age);
      setBreed(preference.breed);
      setGender(preference.gender);
      setNeutered(preference.neutered);
      setType(preference.type);
    }
  }, [preference]);

  useEffect(() => {
    setTypeOptions(typeData);
    setAgeOptions(ageRange);
  }, []);

  useEffect(() => {
    if (type === "Dog") {
      setBreedOptions(breedData.Dog);
    } else if (type === "Cat") {
      setBreedOptions(breedData.Cat);
    } else {
      setBreedOptions([]);
    }
  }, [type]);

  return (
    <>
      <div className="button-and-label-container">
        <h1>Edit Preferences</h1>
      </div>
      <div className="preference-part">
        <div>
          <div className="form-group" style={{ marginTop: "1rem" }}>
            <label htmlFor="type">Type</label>
            <select
              className="add-pet-input form-control"
              id="type"
              value={type}
              onChange={(e) => {
                setType(e.target.value);
                setBreed("All Breeds");
              }}
            >
              <option value="All Types">All Types</option>
              {typeOptions.map((t) => (
                <option key={t} id={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group" style={{ marginBottom: "2%" }}>
            <label htmlFor="breed">Breed</label>
            <select
              className="add-pet-input form-control"
              id="breed"
              value={breed}
              disabled={!type}
              onChange={(e) => setBreed(e.target.value)}
            >
              <option value="All Breeds">All Breeds</option>
              {breedOptions.map((b) => (
                <option key={b} id={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group" style={{ marginBottom: "2%" }}>
            <label htmlFor="age">Age</label>
            <select
              className="add-pet-input form-control"
              id="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            >
              <option value="All Ages">All Ages</option>
              {ageOptions.map((t) => (
                <option key={t} id={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group" style={{ marginBottom: "2%" }}>
            <label htmlFor="type">Gender</label>
            <select
              className="add-pet-input form-control"
              id="type"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option id="All Genders" value="All Genders">
                All Genders
              </option>
              <option id="male" value="Male">
                Male
              </option>
              <option id="female" value="Female">
                Female
              </option>
            </select>
          </div>

          <div className="form-group" style={{ marginBottom: "2%" }}>
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
          <div className="add-pet-save-cancel-container">
            <button
              className="button-petpal-primary"
              onClick={handleSave}
              style={{ marginTop: "0.5rem", marginBottom: "1rem" }}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Preferences;
