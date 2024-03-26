import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import ".././Styles/style.css";
import TempMsg from "./TempMsg";
import useSearchHandler from "../hooks/useSearchHandler";

const ArtistSearchBar = ({ setSearchInput, searchArtistTopTracks }) => {
  const { handleSearch, message, isMsgVisible } = useSearchHandler({
    isAlbumSelected: false,
    isTrackSelected: false,
    setAlbums: false,
    setTracks: false,
    searchAlbumFromArtist: false,
    searchAlbumTracks: false,
    searchArtistTopTracks,
  });

  return (
    <div className="ArtistSearchBar">
      <TempMsg message={message} isMsgVisible={isMsgVisible} />
      <div className="artist-search-bar-container">
        <div className="input-container">
          <input
            className="artist-search-input"
            placeholder="輸入歌手名稱"
            type="text"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <FontAwesomeIcon
            className="artist-search-icon"
            icon={faMagnifyingGlass}
            onClick={() => handleSearch()}
          />
        </div>
      </div>
    </div>
  );
};

export default ArtistSearchBar;
