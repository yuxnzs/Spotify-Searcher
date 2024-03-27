import React from "react";
import ".././Styles/style.css";

const Loading = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className="loading">
      <div className="loader"></div>
      <p>Loading...</p>
    </div>
  );
};

export default Loading;
