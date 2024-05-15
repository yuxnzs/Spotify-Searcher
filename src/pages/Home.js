import React from "react";
import { Link } from "react-router-dom";
import ".././Styles/style.css";

const Home = () => {
  return (
    <div>
      <div className="background-img">
        <div className="filter"></div>
        <div className="text">
          <h1 className="title">搜尋音樂</h1>
          <h2 className="intro">找到您最喜愛的歌手與音樂</h2>
        </div>
        <div className="button-container">
          <div className="button">
            <Link className="link" to="/search-music">
              Search Music
            </Link>
          </div>
          <div className="button">
            <Link className="link" to="/search-artist">
              Search Artist
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
