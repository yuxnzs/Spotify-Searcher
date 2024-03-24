import React from "react";
import { Container, Card } from "react-bootstrap";
import ".././Styles/style.css";

const Display = ({ isVisible, imgURL, name, onClose }) => {
  // 如果不可見，返回 null，表示不顯示
  if (!isVisible) return null;
  console.log("Display");
  return (
    <div className="Display">
      <Container className="display-container">
        <div className="filter" onClick={onClose}></div>
        <Card className="display-card">
          <Card.Img className="display-image" src={imgURL} />
          <Card.Body className="display-name-container">
            <Card.Title className="display-name">{name}</Card.Title>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default Display;
