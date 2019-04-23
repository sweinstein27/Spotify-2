import React, { component } from "react";
import Token from "./Token.js";
import Form from "./Form.js";
import Test from "./Test.js";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Search from "./Search.js";
import Player from "./Player.js";
import Header from "./Header.js"
import Home from "./Home.js"


class App extends React.Component {
    constructor() {
        super();
    }
    render() {
        return (
           <Home/>
        );
    }
}





export default App;