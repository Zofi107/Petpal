import React, { useEffect, useState, useContext } from "react";
import "../style/Likes.css";
import LikedPet from "./LikedPet";
import LikedPetInfo from "./LikedPetInfo";
import AuthContext from "../context/AuthContext";

export default function Likes() {
  const { user } = useContext(AuthContext);

  const [likes, setLikes] = useState([]);
  const [selectedLike, setSelectedLike] = useState();
  const [loading, setLoading] = useState(true);

  const apiUrl =
    "http://969101-petpal-spring-env-1.eba-ihkq2sap.us-east-2.elasticbeanstalk.com";

  useEffect(() => {
    fetch(`${apiUrl}/likes/getLikes/${user.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        setLikes(data);
      })
      .catch((error) => console.log(error));
  }, []);

  function handleRemoveLike(pet) {
    fetch(`${apiUrl}/likes/deleteLike/liker/${user.id}/pet/${pet.id}`, {
      method: "DELETE",
    });

    setLikes(likes.filter((like) => like.petProfile.aPet.id != pet.id));
    setSelectedLike(null);
  }

  return (
    <div className="likes-container" id="likes">
      <div className="liked-pet-list">
        {likes.length ? (
          likes.map((like) => (
            <LikedPet
              key={like.petProfile.aPet.id}
              name={like.petProfile.aPet.name}
              picture={like.petProfile.picture.image_data}
              selected={
                selectedLike &&
                like.petProfile.aPet.id === selectedLike.petProfile.aPet.id
              }
              onClick={() => setSelectedLike(like)}
            />
          ))
        ) : (
          <div className="no-pet-selected-container">
            <p className="no-pet-selected">
              {loading ? "Loading..." : "No likes"}
            </p>
          </div>
        )}
      </div>

      <div className="liked-pet-details">
        {selectedLike ? (
          <LikedPetInfo
            owner={selectedLike.userProfile}
            pet={selectedLike.petProfile.aPet}
            traits={selectedLike.petProfile.traits}
            pictures={selectedLike.petProfile.picture}
            handleRemoveLike={handleRemoveLike}
          />
        ) : (
          <div className="no-pet-selected-container">
            <p className="no-pet-selected">No pet selected</p>
          </div>
        )}
      </div>
    </div>
  );
}
