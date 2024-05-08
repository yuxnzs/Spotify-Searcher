import React from "react";
import { Outlet } from "react-router-dom";
import Nav from "./components/Nav";

const layout = () => {
  return (
    <div>
      <Nav />

      <Outlet />
    </div>
  );
};

export default layout;
