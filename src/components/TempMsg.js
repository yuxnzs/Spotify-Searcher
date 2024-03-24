import React from "react";
import ".././Styles/style.css";

const TempMsg = ({ message, isMsgVisible }) => {
  if (!isMsgVisible) return null;

  return <p className="temp-msg">{message}</p>;
};

export default TempMsg;
