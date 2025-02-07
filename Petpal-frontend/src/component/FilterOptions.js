import React from "react";
import "../style/FilterOptions.css";
import "../style/Button.css";

export default function FilterOptions({ usingPreferences, onClick }) {
  return (
    <div className="filter-options-container">
      <button
        className="button-petpal-secondary toggle-preferences-button"
        onClick={onClick}
      >
        {usingPreferences ? "See all pets" : "Filter by preferences "}
      </button>
    </div>
  );
}
