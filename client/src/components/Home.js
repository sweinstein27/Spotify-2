import React from "react";
import Token from "./Token.js";
import Form from "./Form.js";
import Player from "./Player";
import Search from "./Search"


function Home() {
  return(
<div className="app">
  <div>
          <a href='http://localhost:8888' > Login to Spotify </a>
  </div>
  <div className="row mt-5">
    <div className="col-md-4 offset-md-1">
    <Player/>
    </div>
    <div className="col-md-4 offset-md-1">
    <h2>Add a new Token</h2>
    <Form />
    </div>
    <div className="col-md-4 offset-md-1">
    <Search/>
    </div>
  </div>
</div>
  )
}

export default Home;