import { useState } from "react";

const useSearchHandler = ({
  isAlbumSelected,
  isTrackSelected,
  setAlbums,
  setTracks,
  searchAlbumFromArtist,
  searchAlbumTracks,
  searchArtistTopTracks,
}) => {
  // 控制搜尋的頻率，避免呼叫 API 過於頻繁
  // 並且顯示訊息
  const [canSearch, setCanSearch] = useState(true);
  const [isMsgVisible, setIsMsgVisible] = useState(false);
  const [message, setMessage] = useState("");

  // 確保不會因為使用者一直按著 Enter 鍵而導致訊息顯示錯誤
  const [isShowingMessage, setIsShowingMessage] = useState(false);

  const handleSearch = () => {
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
    } else {
      searchArtistTopTracks();
    }

    setCanSearch(false);

    setTimeout(() => {
      setCanSearch(true);
    }, 1500); // 設定 1.5 秒後才可以再次搜尋
  };

  return { handleSearch, message, isMsgVisible };
};

export default useSearchHandler;
