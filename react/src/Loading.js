import React from "react";

export default function LoadingSpinner({ text }) {
  return text ? (
    <>
      <div className="spinner-container">
        <div className="loading-spinner"></div>
      </div>
      <p>{text}...</p>
    </>
  ) : null;
}
