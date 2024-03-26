import React from "react";
import { Outlet } from "react-router-dom";
import Nav from "./components/Nav";
import Token from "./hooks/useToken";

const layout = () => {
  return (
    <div>
      <Nav />
      {/* <Token /> */}
      <Outlet />
    </div>
  );
};

export default layout;
