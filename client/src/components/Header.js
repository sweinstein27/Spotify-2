import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function Header() {
    return (
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/search" >Search</Link>
        </li>
        <li>
          <Link to="/Player">Player</Link>
        </li>
      </ul>
    );
}

export default Header;