import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import ".././Styles/style.css";
import TempMsg from "./TempMsg";
import useSearchHandler from "../hooks/useSearchHandler";
import { useState, useEffect } from "react";

const MusicSearchBar = ({
  setSearchInput,
  searchAlbumFromArtist,
  searchAlbumTracks,
  albumArtistPicture,
  trackArtistPicture,
  albumArtistName,
  albumNameForTracks,
  isAlbumSelected,
  setIsAlbumSelected,
  isTrackSelected,
  setIsTrackSelected,
  setAlbums,
  setTracks,
  albums,
  tracks,
}) => {
  // 接收 useSearchHandler 回傳的物件
  const { handleSearch, message, isMsgVisible } = useSearchHandler({
    isAlbumSelected,
    isTrackSelected,
    setAlbums,
    setTracks,
    searchAlbumFromArtist,
    searchAlbumTracks,
  });

  // 設置當前圖片狀態
  const [currentPicture, setCurrentPicture] = useState("");

  // 只有切到專輯且專輯自己有圖片才會顯示
  // 只有切到歌曲且歌曲自己有圖片才會顯示
  // 如果是切到歌曲頁面，自己沒圖片，但是專輯有圖片，也不會顯示
  // 確保不該不會發生專輯取得圖片後，切換到歌曲白框又出現
  useEffect(() => {
    // 切到專輯頁面，同時有專輯歌手圖片時，顯示專輯圖片
    if (isAlbumSelected && albumArtistPicture) {
      setCurrentPicture(albumArtistPicture);
      // 切到歌曲頁面，同時有歌曲歌手圖片時，顯示歌曲圖片
    } else if (!isAlbumSelected && trackArtistPicture) {
      setCurrentPicture(trackArtistPicture);
    } else {
      // 如果當前頁面沒有圖片，就不顯示，解決沒圖片時出現白框問題
      setCurrentPicture("");
    }
  }, [isAlbumSelected, albumArtistPicture, trackArtistPicture]);

  return (
    <div className="MusicSearchBar">
      <TempMsg message={message} isMsgVisible={isMsgVisible} />
      <div className="search-bar">
        {/* 在圖片載入前會顯示移除不了的白框，所以沒有圖片時先不渲染 */}
        {currentPicture && (
          <div className="artist-img-wrapper">
            <img className="artist-img" src={currentPicture} alt="Artist" />
          </div>
        )}

        <div className="search">
          <div className="logo">
            <img src="/Spotify_Logo.png" alt="" />
          </div>
          <h1>搜 尋 專 輯 ／ 歌 曲</h1>
          <div className="input-group">
            <input
              className="search-input"
              placeholder={
                isAlbumSelected
                  ? "輸入歌手名稱"
                  : isTrackSelected
                  ? "輸入專輯名稱"
                  : "輸入歌手或專輯名稱"
              }
              type="text"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <FontAwesomeIcon
              className="search-icon"
              icon={faMagnifyingGlass}
              onClick={() => handleSearch()}
              style={{ paddingLeft: "10px" }}
            />
          </div>
          {/* prettier-ignore */}
          <div className="searching-info">
            <h5>
              {/* 確保即使還沒搜尋，也會為"正在搜尋"預留位置，不會造成搜尋後有元素位移感覺 */}
              {/* 分別進行處理是要確保兩個邏輯分開，不會讓專輯結果影響到歌曲 */}
              {/* 第一個後面多餘的條件確保不會在互相切換時，將空格插入至另一個標籤內 */}
              {isAlbumSelected && albums.length > 0 ? `正在搜尋：${albumArtistName}` : isTrackSelected
               && tracks.length > 0 ? "" : "\u00A0"}
              {isTrackSelected && tracks.length > 0 ? `正在搜尋：${albumNameForTracks}` : ""}
            </h5>
          </div>
          <div className="select">
            <label className="left-label">
              <input
                type="checkbox"
                name="selection"
                checked={isAlbumSelected}
                onChange={(e) => {
                  setIsAlbumSelected(e.target.checked);
                  setIsTrackSelected(!e.target.checked);
                }}
              />
              <div className="option">尋找專輯與單曲</div>
            </label>
            <label>
              <input
                type="checkbox"
                name="selection"
                checked={isTrackSelected}
                onChange={(e) => {
                  setIsTrackSelected(e.target.checked);
                  setIsAlbumSelected(!e.target.checked);
                }}
              />
              <div className="option">尋找歌曲</div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicSearchBar;
