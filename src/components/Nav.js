import React from "react";
import { Link } from "react-router-dom";
import "../Styles/style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faMusic, faUser } from "@fortawesome/free-solid-svg-icons";

const Nav = () => {
  return (
    <div className="Nav">
      <nav>
        <ul>
          <li>
            <Link to="/">
              <FontAwesomeIcon className="icon" icon={faHouse} />
              主頁
            </Link>
          </li>
          <li>
            <Link to="/search-music">
              <FontAwesomeIcon className="icon" icon={faMusic} />
              搜尋音樂
            </Link>
          </li>
          <li>
            <Link to="/search-artist">
              <FontAwesomeIcon className="icon" icon={faUser} />
              搜尋歌手
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Nav;
