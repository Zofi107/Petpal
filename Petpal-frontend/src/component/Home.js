import React, { useState, useEffect, useContext } from "react";
import "../style/Home.css";
import PotentialMatch from "./PotentialMatch";
import SwipeButton from "./SwipeButton";
import AuthContext from "../context/AuthContext";
import FilterOptions from "./FilterOptions";

export default function Home() {
  const { user } = useContext(AuthContext);

  const [allPets, setAllPets] = useState([]);
  const [index, setIndex] = useState(null);
  const [currentPet, setCurrentPet] = useState();
  const [usingPreferences, setUsingPreferences] = useState(false);
  const [outOfPets, setOutOfPets] = useState(false);
  const [loading, setLoading] = useState(true);

  const apiUrl =
    "http://969101-petpal-spring-env-1.eba-ihkq2sap.us-east-2.elasticbeanstalk.com";

  useEffect(() => {
    const endpoint = usingPreferences
      ? `${apiUrl}/pets/getFilteredPets/${user.id}`
      : `${apiUrl}/pets/getAllPets/${user.id}`;

    fetch(endpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        setAllPets(data);
        setIndex(0);
      })
      .catch((error) => console.log(error));
  }, [usingPreferences]);

  useEffect(() => {
    if (allPets) setCurrentPet(allPets[index]);
  }, [index, allPets]);

  function removePet() {
    if (index === allPets.length - 1) setOutOfPets(true);
    setIndex((index) => index + 1);
  }

  function handleSwipeRight() {
    fetch(
      `${apiUrl}/likes/setLike/liker/${user.id}/pet/${currentPet.petProfile.aPet.id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .catch((error) => console.log(error));

    removePet();
  }

  function handleFilterChange() {
    setUsingPreferences((usingPreferences) => !usingPreferences);
    if (outOfPets) setOutOfPets(false);
    setLoading(true);
  }

  return (
    <>
      <FilterOptions
        usingPreferences={usingPreferences}
        onClick={handleFilterChange}
      />
      <div className="match-container">
        {currentPet && !loading && (
          <>
            <SwipeButton onSwipe={removePet}>❌</SwipeButton>
            <PotentialMatch
              picture={currentPet.petProfile.picture.image_data}
              name={currentPet.petProfile.aPet.name}
              age={currentPet.petProfile.aPet.age}
              breed={currentPet.petProfile.aPet.breed}
              location={currentPet.userProfile.location}
              traits={currentPet.petProfile.traits}
              description={currentPet.petProfile.aPet.description}
            />
            <SwipeButton onSwipe={handleSwipeRight}>💖</SwipeButton>
          </>
        )}
      </div>
      {(loading || outOfPets) && (
        <div className="find-pets-message-container">
          <p>{loading ? "Loading..." : "Out of pets"}</p>
        </div>
      )}
    </>
  );
}
