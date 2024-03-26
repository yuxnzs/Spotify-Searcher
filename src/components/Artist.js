import React from "react";
import "../Styles/style.css";

const Artist = ({ topTracks, isLoading }) => {
  // console.log(topTracks[0].album);
  return (
    // 如果還在載入，就不渲染
    !isLoading && (
      <div className="Artist">
        {topTracks.map((track, index) => {
          return (
            <div className="track-container" key={index}>
              <div className="track-img">
                <img src={track.album.images[0].url} alt="Track image" />
              </div>
              <div className="right-side-wrapper">
                <div className="content">
                  <div className="track-title">{track.name}</div>
                  <div className="track-info">
                    <div className="album-name">專輯：{track.album.name}</div>
                    <div className="release-date">
                      發行時間：{track.album.release_date}
                    </div>
                  </div>
                </div>
              </div>
              <div className="popularity">
                <p className="text">流行度</p>
                <p className="score">{track.popularity}</p>
              </div>
            </div>
          );
        })}
      </div>
    )
  );
};

export default Artist;
