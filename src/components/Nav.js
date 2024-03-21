import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import ".././Styles/style.css";

function Nav({ setSearchInput, search, artistPicture }) {
  return (
    <div className="Nav">
      <div className="search-bar">
        <div className="artist-img-wrapper">
          <img className="artist-img" src={artistPicture} />
        </div>

        <div className="search">
          <div className="logo">
            <img src="/Spotify_Logo.png" alt="" />
          </div>
          <h1 style={{ marginBottom: "1rem", color: "white" }}>
            Search Artist
          </h1>
          <div className="input-group">
            <input
              className="search-input"
              placeholder="Search For Artist"
              type="text"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  search();
                }
              }}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <FontAwesomeIcon
              className="search-icon"
              icon={faMagnifyingGlass}
              onClick={() => search()}
              style={{ paddingLeft: "10px" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Nav;
