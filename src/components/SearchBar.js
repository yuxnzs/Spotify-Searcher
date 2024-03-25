import React from "react";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import ".././Styles/style.css";
import TempMsg from "./TempMsg";

const Nav = ({
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
  // 控制搜尋的頻率，避免呼叫 API 過於頻繁
  // 並且顯示訊息
  const [canSearch, setCanSearch] = useState(true);
  const [isMsgVisible, setIsMsgVisible] = useState(false);
  const [message, setMessage] = useState("");

  // 確保不會因為使用者一直按著 Enter 鍵而導致訊息顯示錯誤
  const [isShowingMessage, setIsShowingMessage] = useState(false);

  function handleSearch() {
    // 如果無法搜尋，就顯示提示訊息，並且返回
    if (!canSearch) {
      // 避免使用者一直按著 Enter 鍵而導致訊息顯示錯誤
      // 如果沒有 isShowingMessage，setTimeout 會一直被呼叫（背後創建許多計時器）
      // 導致一直重新啟動一個新的 setTimeout 計時器來在 3 秒後將消息隱藏
      if (!isShowingMessage) {
        console.log("操作過快，請稍後再試");
        setMessage("操作過快，請稍後再試");
        setIsMsgVisible(true);
        setIsShowingMessage(true);

        setTimeout(() => {
          setIsMsgVisible(false);
          setIsShowingMessage(false);
        }, 1500); // 3秒後消息消失
      }
      return;
    }

    if (isAlbumSelected) {
      // 當切換成專輯並且重新搜尋時
      setAlbums([]);
      searchAlbumFromArtist(true);
      console.log("in isAlbumSelected");
    } else if (isTrackSelected) {
      // 當切換成歌曲並且重新搜尋時
      setTracks([]);
      searchAlbumTracks(true);
      console.log("in searchAlbumTracks");
    }
    setCanSearch(false);

    setTimeout(() => {
      setCanSearch(true);
    }, 1500); // 設定 1.5 秒後才可以再次搜尋
  }

  return (
    <div className="Nav">
      <TempMsg message={message} isMsgVisible={isMsgVisible} />
      <div className="search-bar">
        <div className="artist-img-wrapper">
          <img
            className="artist-img"
            src={isAlbumSelected ? albumArtistPicture : trackArtistPicture}
          />
        </div>

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
          <h5>
            {/* 確保即使還沒搜尋，也會為"正在搜尋"預留位置，不會造成搜尋後有元素位移感覺 */}
            {/* 分別進行處理是要確保兩個邏輯分開，不會讓專輯結果影響到歌曲 */}
            {/* 第一個後面多餘的條件確保不會在互相切換時，將空格插入至另一個標籤內 */}
            {isAlbumSelected && albums.length > 0 ? `正在搜尋：${albumArtistName}` : isTrackSelected
             && tracks.length > 0 ? "" : "\u00A0"}
            {isTrackSelected && tracks.length > 0 ? `正在搜尋：${albumNameForTracks}` : ""}
          </h5>

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

export default Nav;
