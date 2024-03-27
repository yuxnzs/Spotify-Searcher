import React from "react";
import "../Styles/style.css";

const ArtistInfo = ({ artistInfo, isLoading }) => {
  return (
    !isLoading && (
      <div className="ArtistInfo">
        <div className="artist-info-container">
          <div className="artist-info-picture">
            <img src={artistInfo.images[1].url} alt="" />
          </div>
          <div className="artist-info-right-side">
            <div className="artist-info-right-top">
              <div className="artist-info-name">{artistInfo.name}</div>
            </div>
            <div className="artist-info-right-bottom">
              <div className="artist-info-genre">
                類 型：
                {/* 使用 join 來分隔 */}
                {artistInfo.genres.join(", ")}
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
