import React from "react";
import { Link } from "react-router-dom";
import "../Styles/style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faMusic, faUser } from "@fortawesome/free-solid-svg-icons";

const Nav = () => {
  return (
    <div className="Nav">
      <nav>
        <div className="logo">
          <img src={process.env.PUBLIC_URL + "/logo512.png"} alt="" />
          <h1 className="title">Spotify Searcher</h1>
        </div>
        <div className="list">
          <ul>
            <li>
              <Link className="link-tag" to="/">
                <FontAwesomeIcon className="icon" icon={faHouse} />
                <span>主頁</span>
              </Link>
            </li>
            <li>
              <Link className="link-tag" to="/search-music">
                <FontAwesomeIcon className="icon" icon={faMusic} />
                <span>搜尋音樂</span>
              </Link>
            </li>
            <li>
              <Link className="link-tag" to="/search-artist">
                <FontAwesomeIcon className="icon" icon={faUser} />
                <span>搜尋歌手</span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Nav;
