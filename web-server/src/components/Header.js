import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import About from "./About";
import Home from "./Home";
import Login from "../containers/Login"
import Contact from "./Contact"
import Searches from '../containers/Searches';

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
              <Link to="/home"> Home</Link>
              <Link to="/about"> About </Link>
              <Link to="/contact"> Contact </Link>
              <Link to="/searches"> Searches </Link>
            </div>
          </div>
          </span>
          </nav>
          </div>
          <Route path="/" exact component={Login} />
          <Route path="/about" exact component={About} />
          <Route path="/home" component={Home} />
          <Route path="/contact" component={Contact} />
          <Route path="/searches" component={Searches} />
      </Router>
    );
}

export default Header;