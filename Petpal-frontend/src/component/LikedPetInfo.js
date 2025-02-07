import React from "react";
import "../style/Likes.css";
import "../style/Button.css";
import PersonalityBadge from "./PersonalityBadge";

export default function LikedPetInfo({
  owner,
  pet,
  traits,
  pictures,
  handleRemoveLike,
}) {
  return (
    <>
      <div className="current-owner">
        <div className="remove-like-button-container">
          <h5>Current Owner</h5>
          <button
            className="button-petpal-secondary remove-like-button"
            onClick={() => handleRemoveLike(pet)}
          >
            Remove like
          </button>
        </div>
        <p>
          Name: {owner.first_name} {owner.last_name}
        </p>
        <p>Location: {owner.location}</p>
        <p>Email: {owner.email}</p>
      </div>

      <h5>About {pet.name}</h5>
      <div className="about-pet">
        <div className="about-pet-details-container">
          <p>Breed: {pet.breed}</p>
          <p>Age: {pet.age}</p>
          <p>Gender: {pet.gender}</p>
          <p>Neutered: {pet.neutered === true ? "Yes" : "No"}</p>
          <p>Shots up to date: {pet.up_to_date === true ? "Yes" : "No"}</p>
          <div className="personalities-container">
            {traits &&
              traits.map(({ trait }) => (
                <PersonalityBadge
                  key={trait}
                  text={trait.charAt(0).toUpperCase() + trait.slice(1)}
                />
              ))}
          </div>
          <p>{pet.description}</p>
        </div>

        <div className="about-pet-image-container">
          <img
            src={`data:image/jpg;base64, ${pictures.image_data}`}
            alt={pet.name}
            className="about-pet-image"
          ></img>
        </div>
      </div>
    </>
  );
}
