import Nav from "./components/Nav";
import Albums from "./components/Albums";
import { useState, useEffect } from "react";

function App() {
  const [accessToken, setAccessToken] = useState("");
  // Albums.js
  const [albums, setAlbums] = useState([]);
  // Nav.js
  const [searchInput, setSearchInput] = useState("");
  const [artistPicture, setArtistPicture] = useState(null);
  // Display.js；控制放大圖片視窗的狀態
  const [isDisplayVisible, setIsDisplayVisible] = useState(false);

  useEffect(() => {
    ***REMOVED***
    ***REMOVED***

    // Base64 編碼 client_id 和 client_secret
    const base64 = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);

    // API Access Token
    let authParameters = {
      method: "POST",
      // Spotify asked for to access the token
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${base64}`,
      },
      body: `grant_type=client_credentials`,
    };

    // Fetching data from Spotify API
    fetch("https://accounts.spotify.com/api/token", authParameters)
      .then((response) => response.json())
      .then((data) => {
        return setAccessToken(data.access_token);
      })
      .catch((error) => console.log("Error: ", error));
  }, []); // Fetch token when the page loads

  // Search for artist's album
  async function search() {
    console.log("Search for: ", searchInput);

    // Get request using search to get Artist ID
    const searchParameters = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    };

    try {
      const searchResponse = await fetch(
        `https://api.spotify.com/v1/search?q=${searchInput}&type=artist`,
        searchParameters
      );
      const searchData = await searchResponse.json();
      // Return the first artist's ID from the search
      setArtistPicture(searchData.artists.items[0].images[1].url);
      const artistID = searchData.artists.items[0].id;

      // Get request using Artist ID to get all the Albums from that artist
      const albumsResponse = await fetch(
        `https://api.spotify.com/v1/artists/${artistID}/albums?include_groups=album&market=US&limit=50`,
        searchParameters
      );
      const albumsData = await albumsResponse.json();
      setAlbums(albumsData.items);
    } catch (error) {
      console.log("Error: ", error);
    }
  }

  return (
    <div>
      <Nav
        setSearchInput={setSearchInput}
        artistPicture={artistPicture}
        search={search}
      />
      <Albums
        albums={albums}
        isDisplayVisible={isDisplayVisible}
        setIsDisplayVisible={setIsDisplayVisible}
      />
    </div>
  );
}

export default App;
