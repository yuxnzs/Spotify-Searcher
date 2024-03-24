import React from "react";
import ".././Styles/style.css";

const Loading = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className="loading">
      <div class="loader"></div>
      <p>Loading</p>
    </div>
  );
};

export default Loading;
