import React from "react";
import "../Styles/style.css";

const ArtistInfo = ({ artistInfo, isLoading }) => {
  // 點擊後開啟 Spotify 連結
  const handleClick = (url) => {
    window.open(url, "_blank");
  };
  return (
    !isLoading && (
      <div className="ArtistInfo">
        <div className="artist-info-container">
          {/* "https://i.scdn.co/image/ab67616100005174859e4c14fa59296c8649e0e4" */}
          <div className="artist-info-picture">
            <img src={artistInfo.images[1].url} alt="" />
          </div>
          <div className="artist-info-right-side">
            <div className="artist-info-right-top">
              <div
                className="artist-info-name"
                onClick={() => handleClick(artistInfo.external_urls.spotify)}
              >
                {artistInfo.name}
              </div>
            </div>
            <div className="artist-info-right-bottom">
              <div className="artist-info-genre">
                類 型：{" "}
                {artistInfo.genres.length !== 0
                  ? artistInfo.genres.join(", ").toUpperCase()
                  : "無"}
              </div>
              <div className="artist-info-popularity">
                熱 門 度：{artistInfo.popularity}
              </div>
              <div className="artist-info-followers">
                {/* toLocaleString() 來達成三位一撇 */}追 蹤 人 數：
                {artistInfo.followers.total.toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ArtistInfo;
