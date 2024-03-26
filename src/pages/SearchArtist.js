import React from "react";
import useToken from "../hooks/useToken";
import Artist from "../components/Artist";
import ArtistSearchBar from "../components/ArtistSearchBar";
import useInputLoadingState from "../hooks/useInputLoadingState";
import Loading from "../components/Loading";
import { useState } from "react";

const SearchArtist = () => {
  const searchParameters = useToken();

  // 從自定 hook 取得搜尋欄位的值與 Loading 狀態
  // 之後將傳給 MusicSearchBar 回傳的 searchInput 做 API 搜尋
  const { searchInput, setSearchInput, isLoading, setIsLoading } =
    useInputLoadingState();

  // Artist.js
  const [artistPicture, setArtistPicture] = useState(null);
  const [artistName, setArtistName] = useState("");

  const [topTracks, setTopTracks] = useState([]);

  const searchArtistTopTracks = async () => {
    let artistId = "";
    setIsLoading(true);
    console.log("searchInput", searchInput);
    try {
      const searchResponse = await fetch(
        `https://api.spotify.com/v1/search?q=${searchInput}&type=artist`,
        searchParameters()
      );
      const searchData = await searchResponse.json();
      console.log("Search Data: ", searchData);
      setArtistPicture(searchData.artists.items[0].images[1].url);
      setArtistName(searchData.artists.items[0].name);
      console.log("ID", searchData.artists.items[0].id);
      // 回傳給 searchArtistTopTracks 使用
      artistId = searchData.artists.items[0].id;
    } catch (error) {
      console.error("Error: ", error);
    }

    try {
      const topTracksResponse = await fetch(
        `https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=US`,
        searchParameters()
      );
      const topTracksData = await topTracksResponse.json();
      setTopTracks(topTracksData.tracks);
    } catch (error) {
      console.error("Error: ", error);
    }
    setIsLoading(false);
  };

  return (
    <div>
      <ArtistSearchBar
        setSearchInput={setSearchInput}
        searchArtistTopTracks={searchArtistTopTracks}
      />
      {/* topTracks 被更新才渲染 */}
      {topTracks.length !== 0 && (
        <Artist topTracks={topTracks} isLoading={isLoading} />
      )}
      <Loading isLoading={isLoading} />
    </div>
  );
};

export default SearchArtist;
