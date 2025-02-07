import React from "react";
import "../style/About.css";
import "../style/Button.css";
import { Link } from "react-router-dom";
import dog1 from "../image/about1.jpeg";
import dog2 from "../image/about2.JPG";
import dog3 from "../image/about3.JPG";

export default function About() {
  return (
    <section id="about">
      <div className="cs-container">
        <div className="cs-image-group">
          <picture className="cs-picture cs-picture1">
            <img src={dog1} alt="pet1" width="413" height="388" />
          </picture>

          <picture className="cs-picture cs-picture2">
            <img src={dog2} alt="pet2" width="290" height="290" />
          </picture>

          <picture className="cs-picture cs-picture3">
            <img src={dog3} alt="pet3" width="382" height="349" />
          </picture>
        </div>
        <div className="cs-content">
          <span className="cs-topper">About PetPal- The Pet Tinder</span>
          <h1 className="cs-title">
            Meet Bronco,
            <br />
            the inspiration behind our mission
          </h1>
          <br />
          <p className="cs-text">
            Bronco was rehomed when he was just a wee pup of 14 weeks old. His
            previous owner's busy life meant poor Bronco spent over 8 hours a
            day locked in a crate. Heartbreaking, right? But now, he's thriving,
            and so can your beloved pets!
          </p>

          <p className="cs-text">
            Determined to make rehoming pets safer and easier, we created this
            site. <br />
          </p>

          <p className="cs-text">
            Think of us as Pet Tinder, where we match you with your furry or
            not-so-furry companion. Let's find your perfect pet pal ❤️
          </p>

          <div className="button-box"></div>

          <Link to="/login" exact="true">
            <button className="button-petpal-primary button-petpal-xl">
              Start Matching!
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
