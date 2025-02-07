import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../style/Account.css";
import AuthContext from "../context/AuthContext";

function Adopter() {
  const { user } = useContext(AuthContext);
  const [preference, setPreference] = useState();
  const navigate = useNavigate();

  const apiUrl =
    "http://969100-petpal-preferenceservice-env-1.eba-p4mprkyy.us-east-2.elasticbeanstalk.com";

  const fetchData = async () => {
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
      const data = await response.json();
      if (data) {
        setPreference(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user.id]);

  const [age, setAge] = useState("");
  const [breed, setBreed] = useState("");
  const [gender, setGender] = useState("");
  const [neutered, setNeutered] = useState(false);
  const [type, setType] = useState("");

  //loads preference if there exists a preference onto the component
  useEffect(() => {
    if (preference) {
      // console.log("Preference exists");
      console.log(preference);
      setAge(preference.age);
      setBreed(preference.breed);
      setGender(preference.gender);
      setNeutered(preference.neutered);
      setType(preference.type);
    } else {
      // console.log("Preference null")
      setAge("All Ages");
      setBreed("All Breeds");
      setGender("All Genders");
      setNeutered(false);
      setType("All Types");
    }
  }, [preference]);

  return (
    <div className="pet-part">
      <div className="button-and-label-container">
        <h2>My Preferences</h2>
        <button
          className="button-petpal-primary"
          onClick={() => {
            navigate("/editpreference");
          }}
        >
          Edit
        </button>
      </div>

      <div className="cardPet">
        <div>
          <label className="user-detail-container">
            Type: {type ? type : "All Types"}
          </label>

          <br></br>
          <label className="user-detail-container">
            Breed: {breed ? breed : "All Breeds"}
          </label>

          <br></br>
          <label className="user-detail-container">
            Age: {age === "All Ages" ? "All Ages" : age}
          </label>

          <br></br>
          <label className="user-detail-container">
            Gender: {gender === "All Genders" ? "All Genders" : gender}
          </label>

          <br></br>
          <label className="user-detail-container">
            Neutered: {neutered ? "Yes" : "No"}
          </label>
        </div>
      </div>
    </div>
  );
}

export default Adopter;
