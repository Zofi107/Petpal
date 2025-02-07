import React from "react";
import "../style/PersonalityBadge.css";

export default function PersonalityBadge({ text, disabled, onClick }) {
  let bg;
  switch (text.toLowerCase()) {
    case "hyperactive":
      bg = "#CCFF00";
      break;
    case "family-friendly":
      bg = "#FF5A5A";
      break;
    case "hypoallergenic":
      bg = "#D875FF";
      break;
    case "cuddly":
      bg = "#FC5E01";
      break;
    case "calm":
      bg = "#34FE4F";
      break;
    case "goofy":
      bg = "#FC5F8D";
      break;
    case "intelligent":
      bg = "#ED24FD";
      break;
    case "protective":
      bg = "#FE4F8D";
      break;
    case "stubborn":
      bg = "#AC88FF";
      break;
    case "vocal":
      bg = "#F5F232";
      break;
    case "needy":
      bg = "#8B56CD";
      break;
    case "obedient":
      bg = "#25B3C6";
      break;
    default:
      bg = "#white";
      break;
  }

  return (
    <div
      className="personality-badge"
      onClick={onClick}
      style={{ backgroundColor: disabled ? "silver" : bg }}
    >
      {text}
    </div>
  );
}
