import Display from "./Display";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Card } from "react-bootstrap";
import { useState } from "react";
import ".././Styles/style.css";

function Albums({ albums, isDisplayVisible, setIsDisplayVisible }) {
  // 將要顯示的專輯傳遞給 Display Component
  const [displayAlbumName, setDisplayAlbumName] = useState("");
  const [displayAlbumImage, setDisplayAlbumImage] = useState("");

  function displayAlbum(imgURL, albumName) {
    setDisplayAlbumImage(imgURL);
    setDisplayAlbumName(albumName);
    setIsDisplayVisible(true); // 顯示視窗
  }

  return (
    <div className="Albums">
      {/* Showing result from API call */}
      <Container className="album">
        {/* mx-2 for marging */}
        <div className="album-row">
          {/* Map through the albums and display them */}
          {albums.map((album, index) => {
            // 檢查專輯名稱是否超過特定長度
            const isLongName = album.name.length > 50;
            return (
              <Card className="album-card" key={index}>
                <div className="album-cover-container">
                  <div className="img-wrapper">
                    {/* images[0] for highest quality album */}
                    <Card.Img
                      className="album-cover"
                      src={album.images[0].url}
                      onClick={() => {
                        displayAlbum(album.images[0].url, album.name);
                      }}
                    />
                  </div>
                </div>
                <Card.Body
                  className={`album-name-container ${
                    isLongName ? "align-top" : ""
                  }`}
                >
                  <Card.Title className="album-name">{album.name}</Card.Title>
                </Card.Body>
              </Card>
            );
          })}
        </div>
      </Container>
      {/* 顯示放大圖片的視窗 */}
      <Display
        isVisible={isDisplayVisible}
        onClose={() => setIsDisplayVisible(false)}
        imgURL={displayAlbumImage}
        name={displayAlbumName}
      />
    </div>
  );
}

export default Albums;
