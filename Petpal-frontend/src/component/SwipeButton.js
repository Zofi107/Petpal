import React from "react";

export default function SwipeButton({ children, onSwipe }) {
  return (
    <p className="swipe-button" onClick={onSwipe}>
      {children}
    </p>
  );
}
