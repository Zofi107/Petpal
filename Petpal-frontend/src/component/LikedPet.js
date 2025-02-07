import React from "react";
import "../style/Likes.css";

export default function LikedPet({ name, picture, selected, onClick }) {
  return (
    <div
      className={`liked-pet-list-item ${
        selected && "liked-pet-list-item-selected"
      }`}
      onClick={onClick}
    >
      <img className="liked-pet-list-item-image" src={`data:image/jpg;base64, ${picture}`} alt={name}></img>
      <p className="liked-pet-list-item-name">{name}</p>
    </div>
  );
}
