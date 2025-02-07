import React from "react";
import PersonalityBadge from "./PersonalityBadge";

export default function PotentialMatch({
  picture,
  name,
  age,
  breed,
  location,
  traits,
  description,
}) {
  return (
    <div className="potential-match-container">
      <div className="pet-image-container">
        <img
          src={`data:image/jpg;base64, ${picture}`}
          className="pet-image"
          alt="pet"
        ></img>
      </div>
      <h1 className="pet-name">
        {name}, {age}
      </h1>
      <h2 className="pet-breed">{breed}</h2>
      <h4 className="pet-location">From {location}</h4>
      <div className="personalities-container">
        {traits &&
          traits.map(({ trait }) => (
            <PersonalityBadge
              key={trait}
              text={trait.charAt(0).toUpperCase() + trait.slice(1)}
            />
          ))}
      </div>
      <p className="pet-description">{description}</p>
    </div>
  );
}
