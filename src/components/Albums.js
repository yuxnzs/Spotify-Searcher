import Display from "./Display";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Card } from "react-bootstrap";
import { useState } from "react";
import ".././Styles/style.css";

const Albums = ({
  albums,
  isDisplayVisible,
  setIsDisplayVisible,
  isLoading,
  searchAlbumFromArtist,
  isAlbumsMoreThan50,
}) => {
  // 將要顯示的專輯傳遞給 Display Component
  const [displayAlbumName, setDisplayAlbumName] = useState("");
  const [displayAlbumImage, setDisplayAlbumImage] = useState("");

  // 使用者點擊顯示放大圖片的視窗
  function displayAlbum(imgURL, albumName) {
    setDisplayAlbumImage(imgURL);
    setDisplayAlbumName(albumName);
    setIsDisplayVisible(true); // 顯示視窗
  }

  return (
    // 如果還在載入，就不顯示專輯
    !isLoading && (
      <div className="Albums">
        {/* Showing result from API call */}
        <Container className="content">
          {/* mx-2 for marging */}
          <div className="content-row">
            {/* Map through the albums and display them */}
            {albums.map((album, index) => {
              // 檢查專輯名稱是否超過特定長度
              const isLongName = album.name.length > 50;
              return (
                <Card className="content-card" key={index}>
                  <div className="cover-container">
                    <div className="img-wrapper">
                      {/* images[0] for highest quality album */}
                      <Card.Img
                        className="cover"
                        src={album.images[0].url}
                        onClick={() => {
                          displayAlbum(album.images[0].url, album.name);
                        }}
                      />
                    </div>
                  </div>
                  <Card.Body
                    className={`name-container ${
                      isLongName ? "align-top" : ""
                    }`}
                  >
                    <a
                      className="name-link"
                      href={album.external_urls.spotify}
                      target="_blank"
                    >
                      <Card.Title className="name">{album.name}</Card.Title>
                    </a>
                  </Card.Body>
                </Card>
              );
            })}
          </div>
        </Container>
        {isAlbumsMoreThan50 && (
          <div className="more-btn">
            {/* 加載按鈕，將 isNewSearch 設為 false */}
            <button onClick={() => searchAlbumFromArtist(false, true)}>
              載入更多
            </button>
          </div>
        )}
        {/* 顯示放大圖片的視窗 */}
        <Display
          isVisible={isDisplayVisible}
          onClose={() => setIsDisplayVisible(false)}
          imgURL={displayAlbumImage}
          name={displayAlbumName}
        />
      </div>
    )
  );
};

export default Albums;
