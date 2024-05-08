import React from "react";
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
        <div className="button">
          <a href="/search-music" className="btn">
            Search Music
          </a>
          <a href="/search-artist" className="btn">
            Search Artist
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
