import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import About from "./About";
import Home from "./Home";
import User from "./User";
import Login from "./Login"

function Header() {
    return (
      <Router>
        <div>
          <nav class="navbar navbar-inverse fixed-top bg-dark">
          <span class="navbar-brand mb-0 h1">
            <img src="https://i.imgur.com/snog2NN.png" width="30" height="30" alt=""/>
          <div class="navbar-nav">
            <div class="nav-item">
              <Link to="/"> Login </Link>
              <Link to="/about"> About </Link>
              <Link to="/user"> User Info </Link>
              <Link to="/home"> Home</Link>
            </div>
          </div>
          </span>
          </nav>
          </div>
          <Route path="/" exact component={Login} />
          <Route path="/about" exact component={About} />
          <Route path="/user" exact component={User} />
          <Route path="/home" component={Home} />
      </Router>
    );
}

export default Header;