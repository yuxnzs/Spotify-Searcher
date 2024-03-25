import React from "react";
import "../Styles/style.css";

const Artist = () => {
  return (
    <div className="Artist">
      <div className="track-container">
        <div className="track-img">
          <img
            src="https://i.scdn.co/image/ab67616d0000b273e787cffec20aa2a396a61647

            "
            alt="Track imgage"
          />
        </div>
        <div className="right-side-wrapper">
          <div className="content">
            <div className="track-title">Cruel Summer</div>
            <div className="track-info">
              <p className="album-name">From: Lover</p>
              <p className="release-date">Release Date : 2019-08-23</p>
            </div>
          </div>
          <div className="popularity">
            <p className="text">Popularity</p> <p className="score">98</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Artist;
