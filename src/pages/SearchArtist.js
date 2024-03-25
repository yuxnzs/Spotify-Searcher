import React from "react";
import useToken from "../components/useToken";
import Artist from "../components/Artist";

const SearchArtist = () => {
  const searchParameters = useToken();

  const searchArtistTopTracks = async () => {};

  return (
    <div>
      <Artist />
      <Artist />
      <Artist />
    </div>
  );
};

export default SearchArtist;
