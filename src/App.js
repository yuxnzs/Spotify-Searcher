import React from "react";
import Layout from "./Layout";
import Home from "./pages/Home";
import SearchMusic from "./pages/SearchMusic";
import SearchArtist from "./pages/SearchArtist";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* <Route index element={<Home />} /> */}
          {/* 設為 <SearchMusic /> 作為測試用 */}
          <Route index element={<SearchMusic />} />
          <Route path="/search-music" element={<SearchMusic />} />
          <Route path="/search-artist" element={<SearchArtist />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
