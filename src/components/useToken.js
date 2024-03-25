import { useState, useEffect } from "react";

const useToken = () => {
  const [accessToken, setAccessToken] = useState("");

  // 使用 async/await 來確保取得 token
  useEffect(() => {
    const fetchToken = async () => {
      ***REMOVED***
      ***REMOVED***

      console.log("Token.js is running");

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

      try {
        // Fetching data from Spotify API
        const response = await fetch(
          "https://accounts.spotify.com/api/token",
          authParameters
        );
        const data = await response.json();
        setAccessToken(data.access_token);
      } catch (error) {
        console.log("Error: ", error);
      }
    };

    fetchToken(); // 立即調用函數
  }, []); // Fetch token when the page loads

  // 給 SearchMusic.js 與 SearchArtist.js 使用的參數
  const searchParameters = () => {
    console.log("searchParameters is running", accessToken);
    return {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    };
  };

  return () => searchParameters();
};

export default useToken;
