import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import About from "./About";
import Home from "./Home";
import User from "./User";

function Header() {
    return (
      <Router>
        <div>
          <nav class="navbar navbar-inverse fixed-top bg-dark">
          <span class="navbar-brand mb-0 h1">
            <img src="https://i.imgur.com/snog2NN.png" width="30" height="30" alt=""/>
          <div class="navbar-nav">
            <div class="nav-item">
              <Link to="/"> Home </Link>
              <Link to="/about"> About </Link>
              <Link to="/user"> User Info </Link>
            </div>
          </div>
          </span>
          </nav>
          </div>
          <Route path="/" exact component={Home} />
          <Route path="/about" exact component={About} />
          <Route path="/user" exact component={User} />
      </Router>
    );
}

export default Header;