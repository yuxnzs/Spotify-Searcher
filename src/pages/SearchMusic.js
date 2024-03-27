import MusicSearchBar from "../components/MusicSearchBar";
import Albums from "../components/Albums";
import Loading from "../components/Loading";
import Tracks from "../components/Tracks";
import useToken from "../hooks/useToken";
import useInputLoadingState from "../hooks/useInputLoadingState";
import { useState } from "react";

const SearchMusic = () => {
  const searchParameters = useToken();

  // 從自定 hook 取得搜尋欄位的值與 Loading 狀態
  // 之後將傳給 MusicSearchBar 回傳的 searchInput 做 API 搜尋
  const { searchInput, setSearchInput, isLoading, setIsLoading } =
    useInputLoadingState();

  // Albums.js
  const [albums, setAlbums] = useState([]);

  // Tracks.js
  const [tracks, setTracks] = useState([]);
  const [albumImage, setAlbumImage] = useState("");
  const [trackArtistPicture, setTrackArtistPicture] = useState(null);

  // MusicSearchBar.js
  const [albumArtistPicture, setAlbumArtistPicture] = useState(null);
  const [albumArtistName, setAlbumArtistName] = useState("");
  const [albumNameForTracks, setAlbumNameForTracks] = useState("");
  // 控制是否為專輯或歌曲
  const [isAlbumSelected, setIsAlbumSelected] = useState(true);
  const [isTrackSelected, setIsTrackSelected] = useState(false);

  // Display.js；控制放大圖片視窗的狀態
  const [isDisplayVisible, setIsDisplayVisible] = useState(false);

  // 控制載入更多
  const [offset, setOffset] = useState(0);
  const [isAlbumsMoreThan50, setIsAlbumsMoreThan50] = useState(false);
  const [isTracksMoreThan50, setIsTracksMoreThan50] = useState(false);

  // 避免按下載入更多按鈕時，被新 input 欄位內的值影響
  const [lastValidSearch, setlastValidSearch] = useState("");

  const initializeSearch = (isNewSearch, isLoadMore, setMoreThan50) => {
    // 直接計算當前應使用的 offset 值，而不依賴於 setOffset，因為 setOffset 是非同步的
    let currentOffset = isNewSearch ? 0 : offset + 50;
    let currentSearch = isLoadMore ? lastValidSearch : searchInput;
    console.log("lastValidSearch", lastValidSearch);

    console.log("Search for: ", currentSearch);

    if (isNewSearch) {
      // 若還在取得資料，且是第一次搜尋，顯示 Loading 動畫
      setIsLoading(true);
      // 若是新搜尋，重置 offset（邏輯部分前面已處裡過） 和 isAlbumsMoreThan50
      setOffset(0); // 仍然更新這裡的狀態以保持 UI 同步
      setMoreThan50(false);
      // 確保載入更多按鈕按下後，呼叫 API 時，會提供相同的藝人名稱
      // 如搜尋 Taylor Swift，載入更多後，應該還是搜尋 Taylor Swift
      // 而不會被 input 欄位輸入新的名字給影響
      currentSearch = searchInput;
      setlastValidSearch(searchInput);
    } else if (isLoadMore) {
      setOffset(currentOffset);
    }
    return { currentOffset, currentSearch };
  };

  const updateData = (isNewSearch, setItems, itemsData) => {
    if (isNewSearch) {
      setItems(itemsData.items);
    } else {
      setItems((prevItems) => [...prevItems, ...itemsData.items]);
    }
  };

  // Search for artist's album
  const searchAlbumFromArtist = async (
    isNewSearch = true,
    isLoadMore = false
  ) => {
    // 初始化函數會使用到的變數與條件
    const { currentOffset, currentSearch } = initializeSearch(
      isNewSearch,
      isLoadMore,
      setIsAlbumsMoreThan50
    );

    // 透過使用者所搜尋的取得歌手 ID
    console.log("Searching", currentSearch);
    try {
      const searchResponse = await fetch(
        `https://api.spotify.com/v1/search?q=${currentSearch}&type=artist`,
        searchParameters()
      );
      const searchData = await searchResponse.json();
      setAlbumArtistPicture(searchData.artists.items[0].images[1].url);
      setAlbumArtistName(searchData.artists.items[0].name);

      // 回傳最匹配的結果
      const artistID = searchData.artists.items[0].id;
      // 透過歌手 ID 取得所有專輯
      const albumsResponse = await fetch(
        `https://api.spotify.com/v1/artists/${artistID}/albums?include_groups=album,single&limit=50&offset=${currentOffset}`,
        searchParameters()
      );
      const albumsData = await albumsResponse.json();
      console.log("Albums Data: ", albumsData);

      // 若取得的資料為 50，就顯示載入更多的按鈕
      setIsAlbumsMoreThan50(albumsData.items.length === 50);

      updateData(isNewSearch, setAlbums, albumsData);
    } catch (error) {
      console.log("Error: ", error);
    }
    // 結束取得資料，隱藏 Loading 動畫
    setIsLoading(false);
  };

  const searchAlbumTracks = async (isNewSearch = true, isLoadMore = false) => {
    const { currentOffset, currentSearch } = initializeSearch(
      isNewSearch,
      isLoadMore,
      setIsTracksMoreThan50
    );

    try {
      // 獲取專輯 ID
      const idResponse = await fetch(
        `https://api.spotify.com/v1/search?q=${currentSearch}&type=album`,
        searchParameters()
      );
      const idData = await idResponse.json();
      const albumId = idData.albums.items[0].id;

      // 另外獲取專輯圖片與專輯名稱，因為專輯本身不提供專輯圖片及名稱
      const albumResponse = await fetch(
        `https://api.spotify.com/v1/albums/${albumId}`,
        searchParameters()
      );
      const albumData = await albumResponse.json();
      setAlbumImage(albumData.images[0].url);
      setAlbumNameForTracks(albumData.name);

      // 先取得歌手 ID 再取得歌手照片
      // 因為專輯不提供歌手照片，所以要先從專輯資料中取得歌手 ID
      // 再用歌手 ID 取得歌手照片
      const artistId = albumData.artists[0].id;
      const artistResponse = await fetch(
        `https://api.spotify.com/v1/artists/${artistId}`,
        searchParameters()
      );
      const artistData = await artistResponse.json();
      setTrackArtistPicture(artistData.images[1].url);

      // 根據專輯 ID 獲取歌曲
      const tracksResponse = await fetch(
        `https://api.spotify.com/v1/albums/${albumId}/tracks?limit=50&offset=${currentOffset}`,
        searchParameters()
      );
      const tracksData = await tracksResponse.json();

      // 若取得的資料為 50，就顯示載入更多的按鈕
      setIsTracksMoreThan50(tracksData.items.length === 50);

      updateData(isNewSearch, setTracks, tracksData);
    } catch (error) {
      console.log("Error: ", error);
    }
    // 結束取得資料，隱藏 Loading 動畫
    setIsLoading(false);
  };

  return (
    <div>
      <MusicSearchBar
        setSearchInput={setSearchInput}
        albumArtistPicture={albumArtistPicture}
        albumArtistName={albumArtistName}
        albumNameForTracks={albumNameForTracks}
        searchAlbumFromArtist={searchAlbumFromArtist}
        searchAlbumTracks={searchAlbumTracks}
        trackArtistPicture={trackArtistPicture}
        isAlbumSelected={isAlbumSelected}
        setIsAlbumSelected={setIsAlbumSelected}
        isTrackSelected={isTrackSelected}
        setIsTrackSelected={setIsTrackSelected}
        // 用來清空，當切換專輯和歌曲並且重新搜尋時
        setAlbums={setAlbums}
        setTracks={setTracks}
        // 用來檢查是否要顯示 "正在搜尋" 標籤
        albums={albums}
        tracks={tracks}
      />
      {isAlbumSelected && (
        <Albums
          albums={albums}
          setAlbums={setAlbums}
          isDisplayVisible={isDisplayVisible}
          setIsDisplayVisible={setIsDisplayVisible}
          isLoading={isLoading}
          searchAlbumFromArtist={searchAlbumFromArtist}
          isAlbumsMoreThan50={isAlbumsMoreThan50}
          isAlbumSelected={isAlbumSelected}
        />
      )}
      {isTrackSelected && (
        <Tracks
          tracks={tracks}
          albumImage={albumImage}
          isDisplayVisible={isDisplayVisible}
          setIsDisplayVisible={setIsDisplayVisible}
          isLoading={isLoading}
          searchAlbumTracks={searchAlbumTracks}
          isTracksMoreThan50={isTracksMoreThan50}
        />
      )}
      <Loading isLoading={isLoading} />
    </div>
  );
};

export default SearchMusic;
